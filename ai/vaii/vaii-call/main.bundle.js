(() => {
    "use strict";
    /**
     * Human demo for browsers
     *
     * @description Main demo app that exposes all Human functionality
     *
     * @params Optional URL parameters:
     * image=<imagePath:string>: perform detection on specific image and finish
     * worker=<true|false>: use WebWorkers
     * backend=<webgl|wasm|cpu>: use specific TF backend for operations
     * preload=<true|false>: pre-load all configured models
     * warmup=<true|false>: warmup all configured models
     *
     * @example <https://wyse:10031/?backend=wasm&worker=true&image="/assets/sample-me.jpg">
     *
     * @configuration
     * userConfig={}: contains all model configuration used by human
     * drawOptions={}: contains all draw variables used by human.draw
     * ui={}: contains all variables exposed in the UI
     */

    // test url <https://human.local/?worker=false&async=false&bench=false&draw=true&warmup=full&backend=humangl>

    // @ts-nocheck // typescript checks disabled as this is pure javascript
    let human;

    let userConfig = {
      // face: { enabled: false },
      // body: { enabled: false },
      // hand: { enabled: false },
      /*
      warmup: 'none',
      backend: 'humangl',
      debug: true,
      wasmPath: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@3.9.0/dist/',
      async: false,
      cacheSensitivity: 0.75,
      filter: { enabled: false, flip: false },
      face: { enabled: false,
        detector: { return: false, rotation: true },
        mesh: { enabled: false },
        iris: { enabled: false },
        description: { enabled: false },
        emotion: { enabled: false },
      },
      object: { enabled: false },
      gesture: { enabled: true },
      hand: { enabled: true, maxDetected: 1, minConfidence: 0.5, detector: { modelPath: 'handtrack.json' } },
      body: { enabled: false },
      // body: { enabled: true, modelPath: 'movenet-multipose.json' },
      segmentation: { enabled: false },
      */
    };

    const drawOptions = {
      bufferedOutput: true, // makes draw functions interpolate results between each detection for smoother movement
      drawBoxes: true,
      drawGaze: true,
      drawLabels: true,
      drawGestures: true,
      drawPolygons: true,
      drawPoints: false,
      fillPolygons: false,
      useCurves: false,
      useDepth: true,
    };

    // ui options
    const ui = {
      // configurable items
      console: true, // log messages to browser console
      crop: false, // video mode crop to size or leave full frame
      facing: true, // camera facing front or back
      baseBackground: 'rgba(50, 50, 50, 1)', // 'grey'
      columns: 2, // when processing sample images create this many columns
      useWorker: true, // use web workers for processing
      worker: 'index-worker.js',
      maxFPSframes: 10, // keep fps history for how many frames
      modelsPreload: false, // preload human models on startup
      modelsWarmup: false, // warmup human models on startup
      buffered: true, // should output be buffered between frames
      interpolated: true, // should output be interpolated for smoothness between frames
      iconSize: '48px', // ui icon sizes
      autoPlay: false, // start webcam & detection on load

      // internal variables
      exceptionHandler: true, // should capture all unhandled exceptions
      busy: false, // internal camera busy flag
      menuWidth: 0, // internal
      menuHeight: 0, // internal
      camera: {}, // internal, holds details of webcam details
      detectFPS: [], // internal, holds fps values for detection performance
      drawFPS: [], // internal, holds fps values for draw performance
      drawWarmup: false, // debug only, should warmup image processing be displayed on startup
      drawThread: null, // internl, perform draw operations in a separate thread
      detectThread: null, // internl, perform detect operations in a separate thread
      hintsThread: null, // internal, draw random hints
      framesDraw: 0, // internal, statistics on frames drawn
      framesDetect: 0, // internal, statistics on frames detected
      bench: true, // show gl fps benchmark window
      results: false, // show results tree
      lastFrame: 0, // time of last frame processing
      viewportSet: false, // internal, has custom viewport been set
      background: null, // holds instance of segmentation background image
      transferCanvas: null, // canvas used to transfer data to and from worker

      // webrtc
      useWebRTC: false, // use webrtc as camera source instead of local webcam
      webRTCServer: 'http://localhost:8002',
      webRTCStream: 'reowhite',

      // sample images
      compare: '../samples/ai-face.jpg', // base image for face compare
      samples: [],
    };

    const pwa = {
      enabled: true,
      cacheName: 'Human',
      scriptFile: 'index-pwa.js',
      cacheModels: true,
      cacheWASM: true,
      cacheOther: false,
    };

    // hints
    const hints = [
      'for optimal performance disable unused modules',
      'with modern gpu best backend is webgl otherwise select wasm backend',
      'you can process images by dragging and dropping them in browser window',
      'video input can be webcam or any other video source',
      'check out other demos such as face-matching and face-3d',
      'you can edit input image or video on-the-fly using filters',
      'library status messages are logged in browser console',
    ];

    // global variables
    const menu = {};
    let worker;
    let bench;
    let lastDetectedResult = {};

    // helper function: async pause
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

    // helper function: translates json to human readable string
    function str(...msg) {
      if (!Array.isArray(msg)) return msg;
      let line = '';
      for (const entry of msg) {
        if (typeof entry === 'object') line += JSON.stringify(entry).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ');
        else line += entry;
      }
      return line;
    }

    // helper function: wrapper around console output
    function log(...msg) {
      const dt = new Date();
      const ts = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}.${dt.getMilliseconds().toString().padStart(3, '0')}`;
      // eslint-disable-next-line no-console
      if (ui.console) console.log(ts, ...msg);
    }

    let prevStatus = '';
    function status(msg) {
      const div = document.getElementById('status');
      if (div && msg && msg !== prevStatus && msg.length > 0) {
        log('status', msg);
        document.getElementById('play').style.display = 'none';
        document.getElementById('loader').style.display = 'block';
        div.innerText = msg;
        prevStatus = msg;
      } else {
        const video = document.getElementById('video');
        const playing = (video.srcObject !== null) && !video.paused;
        document.getElementById('play').style.display = playing ? 'none' : 'block';
        document.getElementById('loader').style.display = 'none';
        div.innerText = '';
      }
    }

    async function videoPlay() {
      document.getElementById('btnStartText').innerHTML = 'pause video';
      await document.getElementById('video').play();
      // status();
    }

    async function videoPause() {
      document.getElementById('btnStartText').innerHTML = 'start video';
      await document.getElementById('video').pause();
      status('paused');
      document.getElementById('play').style.display = 'block';
      document.getElementById('loader').style.display = 'none';
    }

    const compare = { enabled: false, original: null };
    async function calcSimmilarity(result) {
      document.getElementById('compare-container').style.display = compare.enabled ? 'block' : 'none';
      if (!compare.enabled) return;
      if (!result || !result.face || !result.face[0] || !result.face[0].embedding) return;
      if (!(result.face.length > 0) || (result.face[0].embedding.length <= 64)) return;
      if (!compare.original) {
        compare.original = result;
        log('setting face compare baseline:', result.face[0]);
        if (result.face[0].tensor) {
          const enhanced = human.enhance(result.face[0]);
          if (enhanced) {
            const c = document.getElementById('orig');
            const squeeze = human.tf.squeeze(enhanced);
            const norm = human.tf.div(squeeze, 255);
            human.tf.browser.toPixels(norm, c);
            human.tf.dispose(enhanced);
            human.tf.dispose(squeeze);
            human.tf.dispose(norm);
          }
        } else {
          document.getElementById('compare-canvas').getContext('2d').drawImage(compare.original.canvas, 0, 0, 200, 200);
        }
      }
      const similarity = human.similarity(compare.original.face[0].embedding, result.face[0].embedding);
      document.getElementById('similarity').innerText = `similarity: ${Math.trunc(1000 * similarity) / 10}%`;
    }

    const isLive = (input) => {
      const isCamera = input.srcObject?.getVideoTracks()[0] && input.srcObject?.getVideoTracks()[0].enabled;
      const isVideoLive = input.readyState > 2;
      const isCameraLive = input.srcObject?.getVideoTracks()[0].readyState === 'live';
      let live = isCamera ? isCameraLive : isVideoLive;
      live = live && !input.paused;
      return live;
    };

    // draws processed results and starts processing of a next frame
    let lastDraw = 0;
    async function drawResults(input) {
      // await delay(25);
      const result = lastDetectedResult;
      const canvas = document.getElementById('canvas');

      // update draw fps data
      ui.drawFPS.push(1000 / (human.now() - lastDraw));
      if (ui.drawFPS.length > ui.maxFPSframes) ui.drawFPS.shift();
      lastDraw = human.now();

      // draw fps chart
      await menu.process.updateChart('FPS', ui.detectFPS);

      document.getElementById('segmentation-container').style.display = userConfig.segmentation.enabled ? 'block' : 'none';
      if (userConfig.segmentation.enabled && ui.buffered) { // refresh segmentation if using buffered output
        const seg = await human.segmentation(input, ui.background);
        if (seg.alpha) {
          const canvasSegMask = document.getElementById('segmentation-mask');
          const ctxSegMask = canvasSegMask.getContext('2d');
          ctxSegMask.clearRect(0, 0, canvasSegMask.width, canvasSegMask.height); // need to clear as seg.alpha is alpha based canvas so it adds
          ctxSegMask.drawImage(seg.alpha, 0, 0, seg.alpha.width, seg.alpha.height, 0, 0, canvasSegMask.width, canvasSegMask.height);
          const canvasSegCanvas = document.getElementById('segmentation-canvas');
          const ctxSegCanvas = canvasSegCanvas.getContext('2d');
          ctxSegCanvas.clearRect(0, 0, canvasSegCanvas.width, canvasSegCanvas.height); // need to clear as seg.alpha is alpha based canvas so it adds
          ctxSegCanvas.drawImage(seg.canvas, 0, 0, seg.alpha.width, seg.alpha.height, 0, 0, canvasSegCanvas.width, canvasSegCanvas.height);
        }
        // result.canvas = seg.alpha;
      } else if (!result.canvas || ui.buffered) { // refresh with input if using buffered output or if missing canvas
        const image = await human.image(input, false);
        result.canvas = image.canvas;
        human.tf.dispose(image.tensor);
      }

      // draw image from video
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = ui.baseBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (result.canvas) {
        if (result.canvas.width !== canvas.width) canvas.width = result.canvas.width;
        if (result.canvas.height !== canvas.height) canvas.height = result.canvas.height;
        ctx.drawImage(result.canvas, 0, 0, result.canvas.width, result.canvas.height, 0, 0, result.canvas.width, result.canvas.height);
      } else {
        ctx.drawImage(input, 0, 0, input.width, input.height, 0, 0, canvas.width, canvas.height);
      }

      // draw all results using interpolated results
      let interpolated;
      if (ui.interpolated) interpolated = human.next(result);
      else interpolated = result;
      human.draw.all(canvas, interpolated, drawOptions);

      // show tree with results
      if (ui.results) {
        const div = document.getElementById('results');
        div.innerHTML = '';
        jsonView(result, div, 'Results', ['canvas', 'timestamp']);
      }

      /* alternatively use individual functions
      human.draw.face(canvas, result.face);
      human.draw.body(canvas, result.body);
      human.draw.hand(canvas, result.hand);
      human.draw.object(canvas, result.object);
      human.draw.gesture(canvas, result.gesture);
      */
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const person = result.persons; // explicitly invoke person getter
      await calcSimmilarity(result);

      // update log
      const engine = human.tf.engine();
      const processing = result.canvas ? `processing: ${result.canvas.width} x ${result.canvas.height}` : '';
      const avgDetect = ui.detectFPS.length > 0 ? Math.trunc(10 * ui.detectFPS.reduce((a, b) => a + b, 0) / ui.detectFPS.length) / 10 : 0;
      const avgDraw = ui.drawFPS.length > 0 ? Math.trunc(10 * ui.drawFPS.reduce((a, b) => a + b, 0) / ui.drawFPS.length) / 10 : 0;
      const warning = (ui.detectFPS.length > 5) && (avgDetect < 2) ? '<font color="lightcoral">warning: your performance is low: try switching to higher performance backend, lowering resolution or disabling some models</font>' : '';
      const fps = avgDetect > 0 ? `FPS process:${avgDetect} refresh:${avgDraw}` : '';
      const backend = result.backend || human.tf.getBackend();
      const gpu = engine.backendInstance ? `gpu: ${(engine.backendInstance.numBytesInGPU ? engine.backendInstance.numBytesInGPU : 0).toLocaleString()} bytes` : '';
      const memory = result.tensors ? `tensors: ${result.tensors.toLocaleString()} in worker` : `system: ${engine.state.numBytes.toLocaleString()} bytes ${gpu} | tensors: ${engine.state.numTensors.toLocaleString()}`;
      document.getElementById('log').innerHTML = `
        video: ${ui.camera.name} | facing: ${ui.camera.facing} | screen: ${window.innerWidth} x ${window.innerHeight} camera: ${ui.camera.width} x ${ui.camera.height} ${processing}<br>
        backend: ${backend} | ${memory}<br>
        performance: ${str(interpolated.performance)}ms ${fps}<br>
        ${warning}<br>
      `;
      ui.framesDraw++;
      ui.lastFrame = human.now();
      if (ui.buffered) {
        if (isLive(input)) {
          // ui.drawThread = requestAnimationFrame(() => drawResults(input));
          ui.drawThread = setTimeout(() => drawResults(input), 25);
        } else {
          cancelAnimationFrame(ui.drawThread);
          videoPause();
          ui.drawThread = null;
        }
      } else {
        if (ui.drawThread) {
          log('stopping buffered refresh');
          cancelAnimationFrame(ui.drawThread);
          ui.drawThread = null;
        }
      }
    }

    // setup webcam
    let initialCameraAccess = true;
    async function setupCamera() {
      if (ui.busy) return null;
      ui.busy = true;
      const video = document.getElementById('video');
      const canvas = document.getElementById('canvas');
      const output = document.getElementById('log');
      if (ui.useWebRTC) {
        status('setting up webrtc connection');
        try {
          video.onloadeddata = () => ui.camera = { name: ui.webRTCStream, width: video.videoWidth, height: video.videoHeight, facing: 'default' };
          await webRTC(ui.webRTCServer, ui.webRTCStream, video);
        } catch (err) {
          log(err);
        } finally {
          // status();
        }
        return '';
      }
      const live = video.srcObject ? ((video.srcObject.getVideoTracks()[0].readyState === 'live') && (video.readyState > 2) && (!video.paused)) : false;
      let msg = '';
      status('setting up camera');
      // setup webcam. note that navigator.mediaDevices requires that page is accessed via https
      if (!navigator.mediaDevices) {
        msg = 'camera access not supported';
        output.innerText += `\n${msg}`;
        log(msg);
        status(msg);
        ui.busy = false;
        return msg;
      }
      let stream;
      const constraints = {
        audio: false,
        video: {
          facingMode: ui.facing ? 'user' : 'environment',
          resizeMode: ui.crop ? 'crop-and-scale' : 'none',
          width: { ideal: document.body.clientWidth },
          // height: { ideal: document.body.clientHeight }, // not set as we're using aspectRation to get height instead
          aspectRatio: document.body.clientWidth / document.body.clientHeight,
          // deviceId: 'xxxx' // if you have multiple webcams, specify one to use explicitly
        },
      };
      // enumerate devices for diag purposes
      if (initialCameraAccess) {
        navigator.mediaDevices.enumerateDevices().then((devices) => log('enumerated input devices:', devices));
        log('camera constraints', constraints);
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') msg = 'camera permission denied';
        else if (err.name === 'SourceUnavailableError') msg = 'camera not available';
        else msg = `camera error: ${err.message || err}`;
        output.innerText += `\n${msg}`;
        status(msg);
        log('camera error:', err);
        ui.busy = false;
        return msg;
      }
      const tracks = stream.getVideoTracks();
      if (tracks && tracks.length >= 1) {
        if (initialCameraAccess) log('enumerated viable tracks:', tracks);
      } else {
        ui.busy = false;
        return 'no camera track';
      }
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      if (initialCameraAccess) log('selected video source:', track, settings);
      ui.camera = { name: track.label.toLowerCase(), width: settings.width, height: settings.height, facing: settings.facingMode === 'user' ? 'front' : 'back' };
      initialCameraAccess = false;

      if (!stream) return 'camera stream empty';

      const ready = new Promise((resolve) => { (video.onloadeddata = () => resolve(true)); });
      video.srcObject = stream;
      await ready;
      if (settings.width > settings.height) canvas.style.width = '100vw';
      else canvas.style.height = '100vh';
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ui.menuWidth.input.setAttribute('value', video.videoWidth);
      ui.menuHeight.input.setAttribute('value', video.videoHeight);
      if (live || ui.autoPlay) await videoPlay();
      // eslint-disable-next-line no-use-before-define
      if ((live || ui.autoPlay) && !ui.detectThread) runHumanDetect(video, canvas);
      return 'camera stream ready';
    }

    function initPerfMonitor() {
      if (!bench) {
        const gl = null;
        // cosnt gl = human.tf.engine().backend.gpgpu.gl;
        // if (!gl) log('bench cannot get tensorflow webgl context');
        bench = new GLBench(gl, {
          trackGPU: false, // this is really slow
          chartHz: 20,
          chartLen: 20,
        });
        bench.begin();
      }
    }

    // wrapper for worker.postmessage that creates worker if one does not exist
    function webWorker(input, image, canvas, timestamp) {
      if (!worker) {
        // create new webworker and add event handler only once
        log('creating worker thread');
        // load Human using IIFE script as Chome Mobile does not support Modules as Workers
        // worker = new Worker(ui.worker, { type: 'module' });
        worker = new Worker(ui.worker);
        // after receiving message from webworker, parse&draw results and send new frame for processing
        worker.addEventListener('message', (msg) => {
          status();
          if (msg.data.result.performance && msg.data.result.performance.total) ui.detectFPS.push(1000 / msg.data.result.performance.total);
          if (ui.detectFPS.length > ui.maxFPSframes) ui.detectFPS.shift();
          if (ui.bench) {
            if (!bench) initPerfMonitor();
            bench.nextFrame(timestamp);
          }
          if (document.getElementById('gl-bench')) document.getElementById('gl-bench').style.display = ui.bench ? 'block' : 'none';
          lastDetectedResult = msg.data.result;

          if (msg.data.image) { // we dont really need canvas since we draw from video
            /*
            if (!lastDetectedResult.canvas || lastDetectedResult.canvas.width !== msg.data.width || lastDetectedResult.canvas.height !== msg.data.height) {
              lastDetectedResult.canvas = (typeof OffscreenCanvas !== 'undefined') ? new OffscreenCanvas(msg.data.width, msg.data.height) : document.createElement('canvas');
              lastDetectedResult.canvas.width = msg.data.width;
              lastDetectedResult.canvas.height = msg.data.height;
            }
            const ctx = lastDetectedResult.canvas.getContext('2d');
            const imageData = new ImageData(new Uint8ClampedArray(msg.data.image), msg.data.width, msg.data.height);
            ctx.putImageData(imageData, 0, 0);
            */
          }

          ui.framesDetect++;
          if (!ui.drawThread) drawResults(input);
          if (isLive(input)) {
            // eslint-disable-next-line no-use-before-define
            ui.detectThread = requestAnimationFrame((now) => runHumanDetect(input, canvas, now));
          }
        });
      }
      // pass image data as arraybuffer to worker by reference to avoid copy
      worker.postMessage({ image: image.data.buffer, width: canvas.width, height: canvas.height, userConfig }, [image.data.buffer]);
    }

    // main processing function when input is webcam, can use direct invocation or web worker
    function runHumanDetect(input, canvas, timestamp) {
      // if live video
      if (!isLive(input)) {
        // stop ui refresh
        // if (ui.drawThread) cancelAnimationFrame(ui.drawThread);
        if (ui.detectThread) cancelAnimationFrame(ui.detectThread);
        if (input.paused) log('video paused');
        // if we want to continue and camera not ready, retry in 0.5sec, else just give up
        // else if (cameraLive && (input.readyState <= 2)) setTimeout(() => runHumanDetect(input, canvas), 500);
        else log(`video not ready: track state: ${input.srcObject ? input.srcObject.getVideoTracks()[0].readyState : 'unknown'} stream state: ${input.readyState}`);
        log('frame statistics: process:', ui.framesDetect, 'refresh:', ui.framesDraw);
        log('memory', human.tf.engine().memory());
        return;
      }
      if (ui.hintsThread) clearInterval(ui.hintsThread);
      if (ui.useWorker && human.env.offscreen) {
        // get image data from video as we cannot send html objects to webworker
        if (!ui.transferCanvas || ui.transferCanvas.width !== canvas.width || ui.transferCanvas.height || canvas.height) {
          ui.transferCanvas = document.createElement('canvas');
          ui.transferCanvas.width = canvas.width;
          ui.transferCanvas.height = canvas.height;
        }
        const ctx = ui.transferCanvas.getContext('2d');
        ctx.drawImage(input, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // perform detection in worker
        webWorker(input, data, canvas, timestamp);
      } else {
        human.detect(input, userConfig).then((result) => {
          status();
          /*
          setTimeout(async () => { // simulate gl context lost 2sec after initial detection
            const ext = human.gl && human.gl.gl ? human.gl.gl.getExtension('WEBGL_lose_context') : {};
            if (ext && ext.loseContext) {
              log('simulate context lost:', human.env.webgl, human.gl, ext);
              human.gl.gl.getExtension('WEBGL_lose_context').loseContext();
              await videoPause();
              status('Exception: WebGL');
            }
          }, 2000);
          */
          if (result.performance && result.performance.total) ui.detectFPS.push(1000 / result.performance.total);
          if (ui.detectFPS.length > ui.maxFPSframes) ui.detectFPS.shift();
          if (ui.bench) {
            if (!bench) initPerfMonitor();
            bench.nextFrame(timestamp);
          }
          if (document.getElementById('gl-bench')) document.getElementById('gl-bench').style.display = ui.bench ? 'block' : 'none';
          if (result.error) {
            log(result.error);
            document.getElementById('log').innerText += `\nHuman error: ${result.error}`;
          } else {
            lastDetectedResult = result;
            if (!ui.drawThread) drawResults(input);
            ui.framesDetect++;
            ui.detectThread = requestAnimationFrame((now) => runHumanDetect(input, canvas, now));
          }
        });
      }
    }

    // main processing function when input is image, can use direct invocation or web worker
    async function processImage(input, title) {
      return new Promise((resolve) => {
        const image = new Image();
        image.onerror = async () => status('image loading error');
        image.onload = async () => {
          if (ui.hintsThread) clearInterval(ui.hintsThread);
          ui.interpolated = false; // stop interpolating results if input is image
          ui.buffered = false; // stop buffering result if input is image
          status(`processing image: ${title}`);
          const canvas = document.getElementById('canvas');
          image.width = image.naturalWidth;
          image.height = image.naturalHeight;
          canvas.width = userConfig.filter.width && userConfig.filter.width > 0 ? userConfig.filter.width : image.naturalWidth;
          canvas.height = userConfig.filter.height && userConfig.filter.height > 0 ? userConfig.filter.height : image.naturalHeight;
          const origCacheSensitiry = userConfig.cacheSensitivity;
          userConfig.cacheSensitivity = 0;
          const result = await human.detect(image, userConfig);
          userConfig.cacheSensitivity = origCacheSensitiry;
          lastDetectedResult = result;
          await drawResults(image);
          const thumb = document.createElement('canvas');
          thumb.className = 'thumbnail';
          thumb.width = ui.columns > 1 ? window.innerWidth / (ui.columns + 0.1) : window.innerWidth - 14;
          thumb.height = thumb.width * canvas.height / canvas.width;
          if (result.face && result.face.length > 0) {
            thumb.title = result.face.map((a, i) => `#${i} face: ${Math.trunc(100 * a.faceScore)}% box: ${Math.trunc(100 * a.boxScore)}% age: ${Math.trunc(a.age)} gender: ${Math.trunc(100 * a.genderScore)}% ${a.gender}`).join(' | ');
          } else {
            thumb.title = 'no face detected';
          }
          thumb.addEventListener('click', (evt) => {
            const stdWidth = ui.columns > 1 ? window.innerWidth / (ui.columns + 0.1) : window.innerWidth - 14;
            // zoom in/out on click
            if (evt.target.style.width === `${stdWidth}px`) {
              evt.target.style.width = '';
              evt.target.style.height = `${document.getElementById('log').offsetTop - document.getElementById('media').offsetTop}px`;
            } else {
              evt.target.style.width = `${stdWidth}px`;
              evt.target.style.height = '';
            }
            // copy to clipboard on click
            if (typeof ClipboardItem !== 'undefined' && navigator.clipboard) {
              evt.target.toBlob((blob) => {
                // eslint-disable-next-line no-undef
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]);
                log('copied image to clipboard');
              });
            }
          });
          const ctx = thumb.getContext('2d');
          ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, thumb.width, thumb.height);
          const prev = document.getElementsByClassName('thumbnail');
          if (prev && prev.length > 0) document.getElementById('samples-container').insertBefore(thumb, prev[0]);
          else document.getElementById('samples-container').appendChild(thumb);
          document.getElementById('samples-container').style.display = 'block';

          // finish up
          status();
          document.getElementById('play').style.display = 'none';
          document.getElementById('loader').style.display = 'none';
          if (ui.detectThread) cancelAnimationFrame(ui.detectThread);
          if (ui.drawThread) cancelAnimationFrame(ui.drawThread);
          log('processed image:', title);
          resolve(true);
        };
        image.src = input;
      });
    }

    async function processVideo(input, title) {
      status(`processing video: ${title}`);
      const video = document.createElement('video');
      const canvas = document.getElementById('canvas');
      video.id = 'video-file';
      video.controls = true;
      video.loop = true;
      // video.onerror = async () => status(`video loading error: ${video.error.message}`);
      video.addEventListener('error', () => status(`video loading error: ${video.error.message}`));
      video.addEventListener('canplay', async () => {
        for (const m of Object.values(menu)) m.hide();
        document.getElementById('samples-container').style.display = 'none';
        canvas.style.display = 'block';
        await videoPlay();
        if (!ui.detectThread) runHumanDetect(video, canvas);
      });
      video.src = input;
    }

    // just initialize everything and call main function
    async function detectVideo() {
      document.getElementById('samples-container').style.display = 'none';
      const video = document.getElementById('video');
      const canvas = document.getElementById('canvas');
      canvas.style.display = 'block';
      cancelAnimationFrame(ui.detectThread);
      if ((video.srcObject !== null) && !video.paused) {
        await videoPause();
        // if (ui.drawThread) cancelAnimationFrame(ui.drawThread);
      } else {
        const cameraError = await setupCamera();
        if (!cameraError) {
          status('starting detection');
          for (const m of Object.values(menu)) m.hide();
          await videoPlay();
          runHumanDetect(video, canvas);
        } else {
          status(cameraError);
        }
      }
    }

    // just initialize everything and call main function
    async function detectSampleImages() {
      document.getElementById('play').style.display = 'none';
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('samples-container').style.display = 'block';
      log('running detection of sample images');
      status('processing images');
      document.getElementById('samples-container').innerHTML = '';
      for (const m of Object.values(menu)) m.hide();
      for (const image of ui.samples) await processImage(image, image);
    }

    function setupMenu() {
      const x = [`${document.getElementById('btnDisplay').offsetLeft}px`, `${document.getElementById('btnImage').offsetLeft}px`, `${document.getElementById('btnProcess').offsetLeft}px`, `${document.getElementById('btnModel').offsetLeft}px`];

      const top = `${document.getElementById('menubar').clientHeight}px`;

      menu.display = new Menu(document.body, '', { top, left: x[0] });
      menu.display.addBool('results tree', ui, 'results', (val) => {
        ui.results = val;
        document.getElementById('results').style.display = ui.results ? 'block' : 'none';
      });
      menu.display.addBool('perf monitor', ui, 'bench', (val) => ui.bench = val);
      menu.display.addBool('buffer output', ui, 'buffered', (val) => ui.buffered = val);
      menu.display.addBool('crop & scale', ui, 'crop', (val) => {
        ui.crop = val;
        setupCamera();
      });
      menu.display.addBool('camera facing', ui, 'facing', (val) => {
        ui.facing = val;
        setupCamera();
      });
      menu.display.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.display.addBool('use depth', drawOptions, 'useDepth');
      menu.display.addBool('use curves', drawOptions, 'useCurves');
      menu.display.addBool('print labels', drawOptions, 'drawLabels');
      menu.display.addBool('draw points', drawOptions, 'drawPoints');
      menu.display.addBool('draw boxes', drawOptions, 'drawBoxes');
      menu.display.addBool('draw polygons', drawOptions, 'drawPolygons');
      menu.display.addBool('fill polygons', drawOptions, 'fillPolygons');

      menu.image = new Menu(document.body, '', { top, left: x[1] });
      menu.image.addBool('enabled', userConfig.filter, 'enabled', (val) => userConfig.filter.enabled = val);
      menu.image.addBool('histogram equalization', userConfig.filter, 'equalization', (val) => userConfig.filter.equalization = val);
      ui.menuWidth = menu.image.addRange('image width', userConfig.filter, 'width', 0, 3840, 10, (val) => userConfig.filter.width = parseInt(val));
      ui.menuHeight = menu.image.addRange('image height', userConfig.filter, 'height', 0, 2160, 10, (val) => userConfig.filter.height = parseInt(val));
      menu.image.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.image.addRange('brightness', userConfig.filter, 'brightness', -1.0, 1.0, 0.05, (val) => userConfig.filter.brightness = parseFloat(val));
      menu.image.addRange('contrast', userConfig.filter, 'contrast', -1.0, 1.0, 0.05, (val) => userConfig.filter.contrast = parseFloat(val));
      menu.image.addRange('sharpness', userConfig.filter, 'sharpness', 0, 1.0, 0.05, (val) => userConfig.filter.sharpness = parseFloat(val));
      menu.image.addRange('blur', userConfig.filter, 'blur', 0, 20, 1, (val) => userConfig.filter.blur = parseInt(val));
      menu.image.addRange('saturation', userConfig.filter, 'saturation', -1.0, 1.0, 0.05, (val) => userConfig.filter.saturation = parseFloat(val));
      menu.image.addRange('hue', userConfig.filter, 'hue', 0, 360, 5, (val) => userConfig.filter.hue = parseInt(val));
      menu.image.addRange('pixelate', userConfig.filter, 'pixelate', 0, 32, 1, (val) => userConfig.filter.pixelate = parseInt(val));
      menu.image.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.image.addBool('negative', userConfig.filter, 'negative', (val) => userConfig.filter.negative = val);
      menu.image.addBool('sepia', userConfig.filter, 'sepia', (val) => userConfig.filter.sepia = val);
      menu.image.addBool('vintage', userConfig.filter, 'vintage', (val) => userConfig.filter.vintage = val);
      menu.image.addBool('kodachrome', userConfig.filter, 'kodachrome', (val) => userConfig.filter.kodachrome = val);
      menu.image.addBool('technicolor', userConfig.filter, 'technicolor', (val) => userConfig.filter.technicolor = val);
      menu.image.addBool('polaroid', userConfig.filter, 'polaroid', (val) => userConfig.filter.polaroid = val);
      menu.image.addHTML('<input type="file" id="file-input" class="input-file"></input> &nbsp input');
      menu.image.addHTML('<input type="file" id="file-background" class="input-file"></input> &nbsp background');

      menu.process = new Menu(document.body, '', { top, left: x[2] });
      menu.process.addList('backend', ['cpu', 'webgl', 'wasm', 'humangl'], userConfig.backend, (val) => userConfig.backend = val);
      menu.process.addBool('async operations', userConfig, 'async', (val) => userConfig.async = val);
      menu.process.addBool('use web worker', ui, 'useWorker');
      menu.process.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.process.addLabel('model parameters');
      menu.process.addRange('max objects', userConfig.face.detector, 'maxDetected', 1, 50, 1, (val) => {
        userConfig.face.detector.maxDetected = parseInt(val);
        userConfig.body.maxDetected = parseInt(val);
        userConfig.hand.maxDetected = parseInt(val);
      });
      menu.process.addRange('skip frames', userConfig.face.detector, 'skipFrames', 0, 50, 1, (val) => {
        userConfig.face.detector.skipFrames = parseInt(val);
        userConfig.face.emotion.skipFrames = parseInt(val);
        userConfig.hand.skipFrames = parseInt(val);
      });
      menu.process.addRange('min confidence', userConfig.face.detector, 'minConfidence', 0.0, 1.0, 0.05, (val) => {
        userConfig.face.detector.minConfidence = parseFloat(val);
        userConfig.face.emotion.minConfidence = parseFloat(val);
        userConfig.hand.minConfidence = parseFloat(val);
      });
      menu.process.addRange('overlap', userConfig.face.detector, 'iouThreshold', 0.1, 1.0, 0.05, (val) => {
        userConfig.face.detector.iouThreshold = parseFloat(val);
        userConfig.hand.iouThreshold = parseFloat(val);
      });
      menu.process.addBool('rotation detection', userConfig.face.detector, 'rotation', (val) => {
        userConfig.face.detector.rotation = val;
        userConfig.hand.rotation = val;
      });
      menu.process.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      // menu.process.addButton('process sample images', 'process images', () => detectSampleImages());
      // menu.process.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.process.addChart('FPS', 'FPS');

      menu.models = new Menu(document.body, '', { top, left: x[3] });
      menu.models.addBool('face detect', userConfig.face, 'enabled', (val) => userConfig.face.enabled = val);
      menu.models.addBool('face mesh', userConfig.face.mesh, 'enabled', (val) => userConfig.face.mesh.enabled = val);
      menu.models.addBool('face iris', userConfig.face.iris, 'enabled', (val) => userConfig.face.iris.enabled = val);
      menu.models.addBool('face description', userConfig.face.description, 'enabled', (val) => userConfig.face.description.enabled = val);
      menu.models.addBool('face emotion', userConfig.face.emotion, 'enabled', (val) => userConfig.face.emotion.enabled = val);
      menu.models.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.models.addBool('body pose', userConfig.body, 'enabled', (val) => userConfig.body.enabled = val);
      menu.models.addBool('hand pose', userConfig.hand, 'enabled', (val) => userConfig.hand.enabled = val);
      menu.models.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.models.addBool('gestures', userConfig.gesture, 'enabled', (val) => userConfig.gesture.enabled = val);
      menu.models.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.models.addBool('body segmentation', userConfig.segmentation, 'enabled', (val) => userConfig.segmentation.enabled = val);
      menu.models.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.models.addBool('object detection', userConfig.object, 'enabled', (val) => userConfig.object.enabled = val);
      menu.models.addHTML('<hr style="border-style: inset; border-color: dimgray">');
      menu.models.addBool('face compare', compare, 'enabled', (val) => {
        compare.enabled = val;
        compare.original = null;
      });

      for (const m of Object.values(menu)) m.hide();

      document.getElementById('btnDisplay').addEventListener('click', (evt) => menu.display.toggle(evt));
      document.getElementById('btnImage').addEventListener('click', (evt) => menu.image.toggle(evt));
      document.getElementById('btnProcess').addEventListener('click', (evt) => menu.process.toggle(evt));
      document.getElementById('btnModel').addEventListener('click', (evt) => menu.models.toggle(evt));
      document.getElementById('btnStart').addEventListener('click', () => detectVideo());
      document.getElementById('play').addEventListener('click', () => detectVideo());
    }

    async function resize() {
      window.onresize = null;
      // best setting for mobile, ignored for desktop
      // can set dynamic value such as Math.min(1, Math.round(100 * window.innerWidth / 960) / 100);
      const viewportScale = 0.7;
      if (!ui.viewportSet) {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', `width=device-width, shrink-to-fit=yes, minimum-scale=0.2, maximum-scale=2.0, user-scalable=yes, initial-scale=${viewportScale}`);
        ui.viewportSet = true;
      }
      const x = [`${document.getElementById('btnDisplay').offsetLeft}px`, `${document.getElementById('btnImage').offsetLeft}px`, `${document.getElementById('btnProcess').offsetLeft}px`, `${document.getElementById('btnModel').offsetLeft}px`];

      const top = `${document.getElementById('menubar').clientHeight - 3}px`;

      menu.display.menu.style.top = top;
      menu.image.menu.style.top = top;
      menu.process.menu.style.top = top;
      menu.models.menu.style.top = top;
      menu.display.menu.style.left = x[0];
      menu.image.menu.style.left = x[1];
      menu.process.menu.style.left = x[2];
      menu.models.menu.style.left = x[3];

      const fontSize = Math.trunc(10 * (1 - viewportScale)) + 14;
      document.documentElement.style.fontSize = `${fontSize}px`;
      human.draw.options.font = `small-caps ${fontSize}px "Segoe UI"`;
      human.draw.options.lineHeight = fontSize + 2;

      await setupCamera();
      window.onresize = resize;
    }

    async function drawWarmup(res) {
      const canvas = document.getElementById('canvas');
      canvas.width = res.canvas.width;
      canvas.height = res.canvas.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(res.canvas, 0, 0, res.canvas.width, res.canvas.height, 0, 0, canvas.width, canvas.height);
      await human.draw.all(canvas, res, drawOptions);
    }

    async function processDataURL(f, action) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (action === 'process') {
            if (e.target.result.startsWith('data:image')) await processImage(e.target.result, f.name);
            if (e.target.result.startsWith('data:video')) await processVideo(e.target.result, f.name);
            document.getElementById('canvas').style.display = 'none';
          }
          if (action === 'background') {
            const image = new Image();
            image.onerror = async () => status('image loading error');
            image.onload = async () => {
              ui.background = image;
              if (document.getElementById('canvas').style.display === 'block') { // replace canvas used for video
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const seg = await human.segmentation(canvas, ui.background, userConfig);
                if (seg.canvas) ctx.drawImage(seg.canvas, 0, 0);
              } else {
                const canvases = document.getElementById('samples-container').children; // replace loaded images
                for (const canvas of canvases) {
                  const ctx = canvas.getContext('2d');
                  const seg = await human.segmentation(canvas, ui.background, userConfig);
                  if (seg.canvas) ctx.drawImage(seg.canvas, 0, 0);
                }
              }
            };
            image.src = e.target.result;
          }
          resolve(true);
        };
        reader.readAsDataURL(f);
      });
    }

    async function runSegmentation() {
      document.getElementById('file-background').onchange = async (evt) => {
        userConfig.segmentation.enabled = true;
        evt.preventDefault();
        if (evt.target.files.length < 2) ui.columns = 1;
        for (const f of evt.target.files) await processDataURL(f, 'background');
      };
    }

    async function dragAndDrop() {
      document.body.addEventListener('dragenter', (evt) => evt.preventDefault());
      document.body.addEventListener('dragleave', (evt) => evt.preventDefault());
      document.body.addEventListener('dragover', (evt) => evt.preventDefault());
      document.body.addEventListener('drop', async (evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
        if (evt.dataTransfer.files.length < 2) ui.columns = 1;
        for (const f of evt.dataTransfer.files) await processDataURL(f, 'process');
      });
      document.getElementById('file-input').onchange = async (evt) => {
        evt.preventDefault();
        if (evt.target.files.length < 2) ui.columns = 1;
        for (const f of evt.target.files) await processDataURL(f, 'process');
      };
    }

    async function drawHints() {
      const hint = document.getElementById('hint');
      ui.hintsThread = setInterval(() => {
        const rnd = Math.trunc(Math.random() * hints.length);
        hint.innerText = 'hint: ' + hints[rnd];
        hint.style.opacity = 1;
        setTimeout(() => {
          hint.style.opacity = 0;
        }, 4500);
      }, 5000);
    }

    async function pwaRegister() {
      if (!pwa.enabled) return;
      if ('serviceWorker' in navigator) {
        try {
          let found;
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const reg of regs) {
            log('pwa found:', reg.scope);
            if (reg.scope.startsWith(location.origin)) found = reg;
          }
          if (!found) {
            const reg = await navigator.serviceWorker.register(pwa.scriptFile, { scope: location.pathname });
            found = reg;
            log('pwa registered:', reg.scope);
          }
        } catch (err) {
          if (err.name === 'SecurityError') log('pwa: ssl certificate is untrusted');
          else log('pwa error:', err);
        }
        if (navigator.serviceWorker.controller) {
          // update pwa configuration as it doesn't have access to it
          navigator.serviceWorker.controller.postMessage({ key: 'cacheModels', val: pwa.cacheModels });
          navigator.serviceWorker.controller.postMessage({ key: 'cacheWASM', val: pwa.cacheWASM });
          navigator.serviceWorker.controller.postMessage({ key: 'cacheOther', val: pwa.cacheOther });

          log('pwa ctive:', navigator.serviceWorker.controller.scriptURL);
          const cache = await caches.open(pwa.cacheName);
          if (cache) {
            const content = await cache.matchAll();
            log('pwa cache:', content.length, 'files');
          }
        }
      } else {
        log('pwa inactive');
      }
    }

    async function main() {
      if (ui.exceptionHandler) {
        window.addEventListener('unhandledrejection', (evt) => {
          if (ui.detectThread) cancelAnimationFrame(ui.detectThread);
          if (ui.drawThread) cancelAnimationFrame(ui.drawThread);
          const msg = evt.reason.message || evt.reason || evt;
          // eslint-disable-next-line no-console
          console.error(msg);
          document.getElementById('log').innerHTML = msg;
          status(`exception: ${msg}`);
          evt.preventDefault();
        });
      }

      log('demo starting ...');

      document.documentElement.style.setProperty('--icon-size', ui.iconSize);

      drawHints();

      // sanity check for webworker compatibility
      if (typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') {
        ui.useWorker = false;
        log('webworker functionality is disabled due to missing browser functionality');
      }

      // register PWA ServiceWorker
      await pwaRegister();

      // parse url search params
      const params = new URLSearchParams(location.search);
      log('url options:', params.toString());
      if (params.has('worker')) {
        ui.useWorker = JSON.parse(params.get('worker'));
        log('overriding worker:', ui.useWorker);
      }
      if (params.has('backend')) {
        userConfig.backend = params.get('backend'); // string
        log('overriding backend:', userConfig.backend);
      }
      if (params.has('preload')) {
        ui.modelsPreload = JSON.parse(params.get('preload'));
        log('overriding preload:', ui.modelsPreload);
      }
      if (params.has('warmup')) {
        ui.modelsWarmup = params.get('warmup'); // string
        log('overriding warmup:', ui.modelsWarmup);
      }
      if (params.has('bench')) {
        ui.bench = JSON.parse(params.get('bench'));
        log('overriding bench:', ui.bench);
      }
      if (params.has('play')) {
        ui.autoPlay = true;
        log('overriding autoplay:', true);
      }
      if (params.has('draw')) {
        ui.drawWarmup = JSON.parse(params.get('draw'));
        log('overriding drawWarmup:', ui.drawWarmup);
      }
      if (params.has('async')) {
        userConfig.async = JSON.parse(params.get('async'));
        log('overriding async:', userConfig.async);
      }

      // create instance of human
      human = new Human(userConfig);
      // human.env.perfadd = true;

      log('human version:', human.version);
      // we've merged human defaults with user config and now lets store it back so it can be accessed by methods such as menu
      userConfig = human.config;
      if (typeof tf !== 'undefined') {
        // eslint-disable-next-line no-undef
        log('TensorFlow external version:', tf.version);
        // eslint-disable-next-line no-undef
        human.tf = tf; // use externally loaded version of tfjs
      }
      log('tfjs version:', human.tf.version.tfjs);

      // setup main menu
      await setupMenu();
      await resize();
      document.getElementById('log').innerText = `Human: version ${human.version}`;

      // preload models
      if (ui.modelsPreload && !ui.useWorker) {
        status('loading');
        await human.load(userConfig); // this is not required, just pre-loads all models
        const loaded = Object.keys(human.models).filter((a) => human.models[a]);
        log('demo loaded models:', loaded);
      } else {
        await human.init();
      }

      // warmup models
      if (ui.modelsWarmup && !ui.useWorker) {
        status('initializing');
        if (!userConfig.warmup || userConfig.warmup === 'none') userConfig.warmup = 'full';
        const res = await human.warmup(userConfig); // this is not required, just pre-warms all models for faster initial inference
        if (res && res.canvas && ui.drawWarmup) await drawWarmup(res);
      }

      // ready
      status('human: ready');
      document.getElementById('loader').style.display = 'none';
      document.getElementById('play').style.display = 'block';
      document.getElementById('results').style.display = 'none';

      // init drag & drop
      await dragAndDrop();

      // init segmentation
      await runSegmentation();

      if (params.has('image')) {
        try {
          const image = JSON.parse(params.get('image'));
          log('overriding image:', image);
          ui.samples = [image];
          ui.columns = 1;
        } catch {
          status('cannot parse input image');
          log('cannot parse input image', params.get('image'));
          ui.samples = [];
        }
        if (ui.samples.length > 0) await detectSampleImages();
      }

      if (params.has('images')) {
        log('overriding images list:', JSON.parse(params.get('images')));
        await detectSampleImages();
      }

      if (human.config.debug) log('environment:', human.env);
      if (human.config.backend === 'humangl' && human.config.debug) log('backend:', human.gl);
    }

    window.onload = main;
    const e = (e, n, o) => {
            const i = e.attachShadow({ mode: "open" }),
                s = document.createElement("template");
            s.innerHTML = '<style>@import "index.js"; @import "styles.css";' + o + "</style>" + t(n, e);
            const a = s.content;
            i.appendChild(a.cloneNode(!0))
        },
        t = (e, t) => {
            const n = (Window.lastComponentId ? Window.lastComponentId : 0) + 1;
            Window.lastComponentId = n;
            const o = "component" + n;
            return Window[o] = t, e.replaceAll("this.", "Window." + o + ".")
        };

    function n(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var o = 0;

    function i(e) { return "__private_" + o++ + "_" + e }
    var s = i("instance"),
        a = i("myDataChannel"),
        r = i("callbackOnMessage");
    class c {
        constructor() {
            if (Object.defineProperty(this, a, { writable: !0, value: void 0 }), Object.defineProperty(this, r, { writable: !0, value: void 0 }), n(c, s)[s]) return n(c, s)[s];
            n(c, s)[s] = this
        }
        getNewMessages(e) { n(this, r)[r] = e }
        setupDataChannel(e) { e.ondatachannel = e => { e.channel.onmessage = e => { n(this, r)[r] && n(this, r)[r](e.data) } }, n(this, a)[a] = e.createDataChannel("myDataChannel") }
        sendChatMessage(e) { n(this, a)[a].send(e) }
    }

    function d(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    Object.defineProperty(c, s, { writable: !0, value: void 0 });
    var h = 0;

    function l(e) { return "__private_" + h++ + "_" + e }
    const p = Object.freeze({ Room: "room", ICE: "ice" });
    var u = l("instance"),
        m = l("firestore");
    class f {
        constructor() {
            if (Object.defineProperty(this, m, { writable: !0, value: void 0 }), d(f, u)[u]) return d(f, u)[u];
            d(f, u)[u] = this, d(this, m)[m] = firebase.firestore()
        }
        async newRoom() { return (await d(this, m)[m].collection(p.Room).add({ open: !0, hostOffer: null, guestAnswer: null })).id }
        async roomExist(e) { return (await d(this, m)[m].collection(p.Room).doc(e).get()).exists }
        async saveOffer(e, t) { await d(this, m)[m].collection(p.Room).doc(e).update({ hostOffer: { type: t.type, sdp: t.sdp } }) }
        async saveAnswer(e, t) { await d(this, m)[m].collection(p.Room).doc(e).update({ guestAnswer: { type: t.type, sdp: t.sdp } }) }
        async saveIce(e, t, n) { await d(this, m)[m].collection(p.Room).doc(e).collection(p.ICE).add({ ice: t, fromHost: n }) }
        getRoomUpdates(e, t) { d(this, m)[m].collection(p.Room).doc(e).onSnapshot((e => { t(e.data()) })) }
        getRoomIceUpdates(e, t, n) { d(this, m)[m].collection(p.Room).doc(e).collection(p.ICE).where("fromHost", "==", t).onSnapshot((e => { e.docChanges().forEach((e => { "added" === e.type && n(e.doc.data().ice) })) })) }
    }

    function w(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    Object.defineProperty(f, u, { writable: !0, value: void 0 });
    var v = 0;

    function b(e) { return "__private_" + v++ + "_" + e }
    var g = b("instance"),
        y = b("firebaseService"),
        O = b("dataChannelService"),
        C = b("myRtcConnection"),
        R = b("roomID"),
        j = b("isHost"),
        P = b("connected"),
        x = b("haveAnswered"),
        E = b("addHostOffer"),
        I = b("addGuestAnswer");
    class T {
        constructor() {
            if (Object.defineProperty(this, I, { value: M }), Object.defineProperty(this, E, { value: _ }), Object.defineProperty(this, y, { writable: !0, value: new f }), Object.defineProperty(this, O, { writable: !0, value: new c }), Object.defineProperty(this, C, { writable: !0, value: void 0 }), Object.defineProperty(this, R, { writable: !0, value: void 0 }), Object.defineProperty(this, j, { writable: !0, value: null }), Object.defineProperty(this, P, { writable: !0, value: !1 }), Object.defineProperty(this, x, { writable: !0, value: !1 }), w(T, g)[g]) return w(T, g)[g];
            w(T, g)[g] = this
        }
        getIsHost() { return w(this, j)[j] }
        getRoomId() { return w(this, R)[R] }
        async newRoom() { w(this, R)[R] = await w(this, y)[y].newRoom(), w(this, j)[j] = !0 }
        async joinRoom(e) { const t = await w(this, y)[y].roomExist(e); return t && (w(this, j)[j] = !1, w(this, R)[R] = e), t }
        setupPeerConnection(e, t) { w(this, C)[C] = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun2.1.google.com:19302" }] }), e.getTracks().forEach((e => { w(this, C)[C].addTrack(e, new MediaStream) })), w(this, C)[C].ontrack = e => { t(e.streams[0]), w(this, P)[P] = !0 }, w(this, C)[C].onicecandidate = e => { e.candidate && w(this, y)[y].saveIce(w(this, R)[R], e.candidate.toJSON(), w(this, j)[j]) }, w(this, O)[O].setupDataChannel(w(this, C)[C]) }
        async createAndSaveOffer() {
            const e = await w(this, C)[C].createOffer();
            await w(this, C)[C].setLocalDescription(e), w(this, y)[y].saveOffer(w(this, R)[R], e)
        }
        async connectToOtherPerson() { w(this, y)[y].getRoomUpdates(w(this, R)[R], (e => { e.guestAnswer && w(this, j)[j] && w(this, I)[I](e.guestAnswer), !e.hostOffer || w(this, x)[x] || w(this, j)[j] || w(this, E)[E](e.hostOffer) })), w(this, y)[y].getRoomIceUpdates(w(this, R)[R], !w(this, j)[j], (async e => { await w(this, C)[C].addIceCandidate(new RTCIceCandidate(e)) })), w(this, j)[j] && await this.createAndSaveOffer() }
    }
    Object.defineProperty(T, g, { writable: !0, value: void 0 });
    var _ = async function(e) {
            w(this, x)[x] = !0, await w(this, C)[C].setRemoteDescription(e);
            const t = await w(this, C)[C].createAnswer();
            await w(this, C)[C].setLocalDescription(t), await w(this, y)[y].saveAnswer(w(this, R)[R], t)
        },
        M = async function(e) { await w(this, C)[C].setRemoteDescription(e) };
    const k = Object.freeze({ Home: { path: "/", component: "vaii-page-home", title: "Home" }, Room: { path: "/room", component: "vaii-page-room", title: "Room" }, About: { path: "/about", component: "vaii-page-about", title: "About" } });

    function H(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var L = 0;

    function A(e) { return "__private_" + L++ + "_" + e }
    var S = A("WebRTCService"),
        D = A("bc"),
        V = A("gotoRoomPage");
    class B extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, V, { value: U }), Object.defineProperty(this, S, { writable: !0, value: new T }), Object.defineProperty(this, D, { writable: !0, value: void 0 }), e(this, '<h1>Start new room</h1>\n<button class="button" onclick="this.newRoom()">New Room</button>\n<h1>Join Room</h1>\n<div>\n  <input\n    is="text-input"\n    id="roomIdInput"\n    class="input"\n    type="text"\n    placeholder="Room ID"\n    autofocus\n  />\n  <button class="button" onclick="this.joinRoom()">Join Room</button>\n</div>\n<h1>About</h1>\n<button class="button" onclick="this.gotoAboutPage()">About</button>\n', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n\n#roomIdInput {\n  min-width: 300px;\n}\n") }
        connectedCallback() { H(this, D)[D] = new BroadcastChannel("room-auto-join"), H(this, D)[D].onmessage = e => { this.shadowRoot.getElementById("roomIdInput").value = e.data, this.joinRoom() } }
        disconnectedCallback() { H(this, D)[D].close() }
        async newRoom() { await H(this, S)[S].newRoom(), H(this, V)[V]() }
        async joinRoom() {
            const e = this.shadowRoot.getElementById("roomIdInput").value;
            e ? await H(this, S)[S].joinRoom(e) ? H(this, V)[V]() : alert(" Room not found") : alert("No Room")
        }
        gotoAboutPage() {
            const e = new CustomEvent("ChangePage", { detail: k.About });
            this.dispatchEvent(e)
        }
    }
    var U = function() {
        const e = new CustomEvent("ChangePage", { detail: k.Room });
        this.dispatchEvent(e)
    };

    function W(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var N = 0;

    function z(e) { return "__private_" + N++ + "_" + e }
    var J = z("currentPage"),
        G = z("defaultPage"),
        Q = z("renderCorrectPage"),
        Y = z("gotoNewPage"),
        $ = z("addCurrentPageToHistory"),
        q = z("getCurrentPageFromUrl");
    class F extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, q, { value: ee }), Object.defineProperty(this, $, { value: Z }), Object.defineProperty(this, Y, { value: X }), Object.defineProperty(this, Q, { value: K }), Object.defineProperty(this, J, { writable: !0, value: void 0 }), Object.defineProperty(this, G, { writable: !0, value: k.Home }), e(this, "", ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n") }
        connectedCallback() { W(this, J)[J] = W(this, q)[q](), W(this, Q)[Q](), window.addEventListener("popstate", (e => { e.state ? W(this, J)[J] = e.state : W(this, J)[J] = W(this, G)[G], W(this, Q)[Q]() })) }
    }
    var K = function() {
            const e = "CurrentPage",
                t = this.shadowRoot.getElementById(e);
            t && this.shadowRoot.removeChild(t);
            const n = document.createElement(W(this, J)[J].component);
            n.id = e, n.addEventListener("ChangePage", (e => W(this, Y)[Y](e.detail))), this.shadowRoot.appendChild(n);
            const o = W(this, J)[J].title;
            document.title = o
        },
        X = function(e) { W(this, J)[J] = e, W(this, $)[$](), W(this, Q)[Q]() },
        Z = function() { history.pushState(W(this, J)[J], W(this, J)[J].title, window.location.origin + W(this, J)[J].path) },
        ee = function() {
            for (const e in k)
                if (k[e].path === window.location.pathname) return k[e];
            return W(this, G)[G]
        };

    function te(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var ne = 0;

    function oe(e) { return "__private_" + ne++ + "_" + e }
    var ie = oe("localVideoStream"),
        se = oe("webRTCService"),
        ae = oe("roomID"),
        re = oe("connected"),
        ce = oe("returnToHome"),
        de = oe("getDesiredCameraId");
    class he extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, de, { value: pe }), Object.defineProperty(this, ce, { value: le }), Object.defineProperty(this, ie, { writable: !0, value: void 0 }), Object.defineProperty(this, se, { writable: !0, value: new T }), Object.defineProperty(this, ae, { writable: !0, value: void 0 }), Object.defineProperty(this, re, { writable: !0, value: !1 }), e(this, '<h1>Welcome to the room <span id="roomID"></span></h1>\n<vaii-room-video id="video"></vaii-room-video>\n\n', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n") }
        connectedCallback() {
            if (!te(this, se)[se].getRoomId()) return te(this, ce)[ce](), !1;
            te(this, ae)[ae] = te(this, se)[se].getRoomId(), this.shadowRoot.getElementById("roomID").innerText = te(this, ae)[ae], te(this, se)[se].getIsHost() && (this.addRoomIdToClipboard(), this.sendBcMessageWithRoomId()), this.setupVideo()
        }
        async addRoomIdToClipboard() { await navigator.clipboard.writeText(te(this, ae)[ae]) }
        sendBcMessageWithRoomId() {
            const e = new BroadcastChannel("room-auto-join");
            e.postMessage(te(this, ae)[ae]), e.close()
        }
        async setupVideo() {
            const e = await navigator.mediaDevices.enumerateDevices();
            let t = { width: { ideal: 720 }, height: { ideal: 480 }, frameRate: { ideal: 30 } };
            const n = te(this, de)[de](e);
            n && (t = {...t, deviceId: n.deviceId });
            const o = { video: t, audio: !1 };
            navigator.mediaDevices.getUserMedia(o).then((e => this.onUserAllowVideo(e)), (e => { console.warn(e), alert("Can't get camera 😞") }))
        }
        onRemoteVideo(e) { this.shadowRoot.getElementById("video").setRemoteVideo(e), te(this, re)[re] = !0, this.showChat() }
        onUserAllowVideo(e) { te(this, ie)[ie] = e, te(this, se)[se].setupPeerConnection(te(this, ie)[ie], this.onRemoteVideo.bind(this)), this.shadowRoot.getElementById("video").setLocalVideo(te(this, ie)[ie]), te(this, se)[se].connectToOtherPerson() }
        showChat() {
            const e = document.createElement("vaii-room-chat");
            this.shadowRoot.appendChild(e)
        }
    }
    var le = function() {
            const e = new CustomEvent("ChangePage", { detail: k.Home });
            this.dispatchEvent(e)
        },
        pe = function(e) { const t = e.find((e => "Logi Capture" === e.label)); if (te(this, se)[se].getIsHost()) return t; return e.find((e => "Microsoft® LifeCam Studio(TM) (045e:0772)" === e.label)) || t };

    function ue(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var me = 0;

    function fe(e) { return "__private_" + me++ + "_" + e }
    var we = fe("localVideoStream"),
        ve = fe("remoteVideoStream");
    class be extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, we, { writable: !0, value: void 0 }), Object.defineProperty(this, ve, { writable: !0, value: void 0 }), e(this, '<div class="videos-container">\n   <vaii-play disabled id="play" class="play icon-play"></vaii-play>\n <vaii-ground id="background" class="background">\n <div class="wave one"></div>\n <div class="wave two"></div>\n <div class="wave three"></div>\n </vaii-ground>\n <vaii-load id="loader" class="loader"></vaii-load>\n <vaii-status id="status" class="status"></vaii-status>\n <vaii-bar id="menubar" class="menubar">\n <div id="btnDisplay" class="icon">\n <div class="icon-binoculars"></div>display</div>\n <div id="btnImage" class="icon">\n <div class="icon-brush">\n</div>input</div>\n <div id="btnProcess" class="icon">\n <div class="icon-stats">\n</div>options</div>\n <div id="btnModel" class="icon">\n <div class="icon-games">\n</div>models</div>\n <div id="chatVAII" class="icon">\n <div id="myBtn" class="icon-record">\n</div>Start</div>\n <div id="btnStart" class="icon">\n <div class="icon-webcam">\n</div>\n<span id="btnStartText">start video</span>\n</div>\n </vaii-bar>\n <vaii-media id="media">\n <canvas id="canvas" class="canvas" style="position:absolute;\n left:0px;\n top:0px;\n"></canvas>\n <vaii-video></vaii-video>\n <video id="video" playsinline class="video"></video>\n<video id="localVideo" autoplay muted></video>\n </vaii-media>\n <vaii-compare-container id="compare-container" class="compare-image">\n <canvas id="compare-canvas" width="256" height="256"></canvas>\n <div id="similarity"></div>\n </vaii-compare-container>\n <vaii-segmen-container id="segmentation-container" class="compare-image">\n <canvas id="segmentation-mask" width="256" height="256" style="width: 256px; height: 256px;"></canvas>\n <canvas id="segmentation-canvas" width="256" height="256 " style="width: 256px; height: 256px;"></canvas>\n </vaii-segmen-container>\n <vaii-samp-container id="samples-container" class="samples-container"></vaii-samp-container>\n <vaii-hint id="hint" class="hint"></vaii-hint>\n <vaii-log id="log" class="log"></vaii-log>\n <vaii-results id="results" class="results"></vaii-results>\n <vaii-transcript id="transcript"></vaii-transcript>\n</div>\n', ".videos-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n\n  width: 800px;\n}\n\n#remoteVideo {\n  width: 100%;\n  max-height: 800px;\n}\n#localVideo {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 250px;\n}\n @font-face { font-family: 'Lato';\n font-display: swap;\n font-style: normal;\n font-weight: 100;\n src: local('Lato'), url('../assets/lato-light.woff2') ;\n html { font-family: 'Lato', 'Segoe UI';\n font-size: 16px;\n font-variant: small-caps;\n ;\n body { margin: 0;\n background: black;\n color: white;\n overflow-x: hidden;\n width: 100vw;\n height: 100vh;\n ;\n body::-webkit-scrollbar { display: none;\n ;\n hr { width: 100%;\n ;\n .play { position: absolute;\n width: 256px;\n height: 256px;\n z-index: 9;\n bottom: 15%;\n left: 50%;\n margin-left: -125px;\n display: none;\n filter: grayscale(1);\n ;\n .play:hover { filter: grayscale(0);\n ;\n .btn-background { fill:grey;\n cursor: pointer;\n opacity: 0.6;\n ;\n .btn-background:hover { opacity: 1;\n ;\n .btn-foreground { fill:white;\n cursor: pointer;\n opacity: 0.8;\n ;\n .btn-foreground:hover { opacity: 1;\n ;\n .status { position: absolute;\n width: 100vw;\n bottom: 10%;\n text-align: center;\n font-size: 3rem;\n font-weight: 100;\n text-shadow: 2px 2px #303030;\n ;\n .thumbnail { margin: 8px;\n box-shadow: 0 0 4px 4px dimgrey;\n ;\n .thumbnail:hover { box-shadow: 0 0 8px 8px dimgrey;\n filter: grayscale(1);\n }\n .log { position: absolute;\n bottom: 0;\n margin: 0.4rem 0.4rem 0 0.4rem;\n font-size: 0.9rem;\n }\n .menubar { width: 100vw;\n background: #303030;\n display: flex;\n justify-content: space-evenly;\n text-align: center;\n padding: 8px;\n cursor: pointer;\n }\n .samples-container { display: flex;\n flex-wrap: wrap;\n }\n .video { display: none;\n }\n .canvas { margin: 0 auto;\n }\n .bench { position: absolute;\n right: 0;\n bottom: 0;\n }\n .compare-image { width: 256px;\n position: absolute;\n top: 150px;\n left: 30px;\n box-shadow: 0 0 2px 2px black;\n background: black;\n display: none;\n }\n .loader { width: 300px;\n height: 300px;\n border: 3px solid transparent;\n border-radius: 50%;\n border-top: 4px solid #f15e41;\n animation: spin 4s linear infinite;\n position: absolute;\n bottom: 15%;\n left: 50%;\n margin-left: -150px;\n z-index: 15;\n }\n .loader::before, .loader::after { content: "";\n position: absolute;\n top: 6px;\n bottom: 6px;\n left: 6px;\n right: 6px;\n border-radius: 50%;\n border: 4px solid transparent;\n }\n .loader::before { border-top-color: #bad375;\n animation: 3s spin linear infinite;\n }\n .loader::after { border-top-color: #26a9e0;\n animation: spin 1.5s linear infinite;\n }\n @keyframes spin { from { transform: rotate(0deg);\n }\n to { transform: rotate(360deg);\n }\n }\n .wave { position: fixed;\n top: 0;\n left: -90%;\n width: 100vw;\n height: 100vh;\n border-radius: 10%;\n opacity: .3;\n z-index: -1;\n }\n .wave.one { animation: rotate 10000ms infinite linear;\n background: #2F4F4F;\n }\n .wave.two { animation: rotate 15000ms infinite linear;\n background: #1F3F3F;\n }\n .wave.three { animation: rotate 20000ms infinite linear;\n background: #0F1F1F;\n }\n @keyframes rotate { from { transform: rotate(0deg);\n }\n from { transform: rotate(360deg);\n }\n }\n .button { text-shadow: 2px 2px black;\n display: flex;\n }\n .button:hover { text-shadow: -2px -2px black;\n color: lightblue;\n }\n .button::before { display: inline-block;\n font-style: normal;\n font-variant: normal;\n text-rendering: auto;\n -webkit-font-smoothing: antialiased;\n font-family: "FA";\n font-weight: 900;\n font-size: 2.4rem;\n margin-right: 0.4rem;\n }\n .button-display::before { content: "\f8c4";\n }\n .button-image::before { content: "\f3f2";\n }\n .button-process::before { content: "\f3f0";\n }\n .button-model::before { content: "\f2c2";\n }\n .button-start::before { content: "\f144";\n }\n .button-stop::before { content: "\f28b";\n }\n .icon { width: 180px;\n text-align: -webkit-center;\n text-align: -moz-center;\n filter: grayscale(1);\n }\n .icon:hover { background: #505050;\n filter: grayscale(0);\n }\n .hint { opacity: 0;\n transition-duration: 0.5s;\n transition-property: opacity;\n font-style: italic;\n position: fixed;\n top: 5rem;\n padding: 8px;\n margin: 8px;\n box-shadow: 0 0 2px 2px #303030;\n }\n .input-file { align-self: center;\n width: 5rem;\n }\n .results { position: absolute;\n left: 0;\n top: 5rem;\n background: #303030;\n width: 20rem;\n height: 90%;\n font-size: 0.8rem;\n overflow-y: auto;\n display: none }\n .results::-webkit-scrollbar { background-color: #303030;\n }\n .results::-webkit-scrollbar-thumb { background: black;\n border-radius: 10px;\n }\n .json-line { margin: 4px 0;\n display: flex;\n justify-content: flex-start;\n }\n .json {margin-right: 8px;\n margin-left: 8px;\n }\n .json-type { color: lightyellow;\n }\n .json-key {color: white;\n }\n .json-index { color: lightcoral;\n }\n .json-value {margin-left: 20px;\n }\n .json-number { color: lightgreen;\n }\n .json-boolean { color: lightyellow;\n }\n .json-string { color: lightblue;\n }\n .json-size { color: gray;\n }\n .hide {display: none;\n }\n .fas { display: inline-block;width: 0;height: 0;\n border-style: solid;\n }\n .fa-caret-down { border-width: 10px 8px 0 8px;\n  border-color: white transparent }\n .fa-caret-right {border-width: 10px 0 8px 10px;\n  border-color: transparent transparent transparent white;\n  }") }
        setLocalVideo(e) { ue(this, we)[we] = e, this.shadowRoot.getElementById("localVideo").srcObject = ue(this, we)[we] }
        setRemoteVideo(e) { ue(this, ve)[ve] = e, this.shadowRoot.getElementById("remoteVideo").srcObject = ue(this, ve)[ve] }
    }

    function ge(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var ye = 0;

    function Oe(e) { return "__private_" + ye++ + "_" + e }
    var Ce = Oe("webRTCService"),
        Re = Oe("DataChannelService"),
        je = Oe("chatMessageText");
    class Pe extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, Ce, { writable: !0, value: new T }), Object.defineProperty(this, Re, { writable: !0, value: new c }), Object.defineProperty(this, je, { writable: !0, value: "" }), e(this, '<h1>Chat!</h1>\n<div class="chat-container">\n  <div id="chatList"></div>\n  <div class="inputs-container">\n    <input\n      id="chatMessage"\n      class="input"\n      type="text"\n      placeholder="Room ID"\n      onchange="this.chatMessageChange(this)"\n      autofocus\n    />\n    <button class="button" onclick="this.sendChatMessage()">Send message</button>\n  </div>\n</div>\n', ":host {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.inputs-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.input {\n  min-width: 300px;\n  margin-right: 5px;\n}\n\n.chat-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#chatList {\n  min-width: 300px;\n  min-height: 50px;\n  margin-right: 5px;\n  border: 1px solid #ffffff;\n  padding: 5px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.my-message,\n.other-message {\n  border-radius: 18px;\n  padding: 8px 12px;\n  margin: 5px 2px;\n  display: inline-block;\n}\n.my-message {\n  background-color: rgb(0, 132, 255);\n  text-align: right;\n\n  margin-left: auto;\n}\n\n.other-message {\n  background-color: rgb(62, 64, 66);\n  margin-right: auto;\n}\n") }
        connectedCallback() { ge(this, Re)[Re].getNewMessages((e => { this.addMessageToChat(e, !1) })) }
        chatMessageChange(e) { ge(this, je)[je] = e.value }
        sendChatMessage() { ge(this, Re)[Re].sendChatMessage(ge(this, je)[je]), this.addMessageToChat(ge(this, je)[je], !0), ge(this, je)[je] = "", this.shadowRoot.getElementById("chatMessage").value = ge(this, je)[je] }
        addMessageToChat(e, t) {
            const n = t ? "You: " : "Guest: ",
                o = t ? "my-message" : "other-message ",
                i = this.shadowRoot.getElementById("chatList"),
                s = `<div class="${o}"><b>${n}</b>${e}</div>`;
            i.innerHTML = i.innerHTML + s
        }
    }
    var xe = 0,
        Ee = "__private_" + xe++ + "_goHomeEvent";
    class Ie extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, Ee, { writable: !0, value: new CustomEvent("ChangePage", { detail: k.Home }) }), e(this, '<h1>Welcome to about page!</h1>\n<img src="assets/pondus.jpg" class="img">\n<button class="button" onclick="this.back()">Back</button>', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n\n.input {\n  min-width: 300px;\n}\n\n.img {\n  max-width: 800px;\n  margin-bottom: 20px;\n}") }
        back() { this.dispatchEvent(function(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }(this, Ee)[Ee]) }
    }
    class Te extends HTMLInputElement {
        constructor() { super() }
        connectedCallback() { this.validate(), this.addEventListener("keyup", this.validate.bind(this)) }
        disconnectedCallback() { this.removeEventListener("keyup", this.validate.bind(this)) }
        validate() { this.value ? this.style.border = "" : this.style.border = "2px solid red" }
    }
    firebase.initializeApp({ apiKey: "AIzaSyCgTQkGRQBqmvCY4u6wuJ1MTVQ7YPViUig", authDomain: "web-components-webrtc.firebaseapp.com", databaseURL: "https://web-components-webrtc.firebaseio.com", projectId: "web-components-webrtc", storageBucket: "web-components-webrtc.appspot.com", messagingSenderId: "57628399273", appId: "1:57628399273:web:c01bfb9b6cf5d164007bb8" }), customElements.define("vaii-page", F), customElements.define("vaii-page-home", B), customElements.define("vaii-page-about", Ie), customElements.define("vaii-page-room", he), customElements.define("vaii-room-video", be), customElements.define("vaii-room-chat", Pe), customElements.define("text-input", Te, { extends: "input" })
})();
//# sourceMappingURL=main.bundle.js.map
