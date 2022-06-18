localVideo.onmousedown = function(event) {
    localVideo.style.position = 'absolute';
    localVideo.style.zIndex = 1000;
    document.body.appendChild(localVideo);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        localVideo.style.left = pageX - localVideo.offsetWidth / 2 + 'px';
        localVideo.style.top = pageY - localVideo.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    localVideo.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        localVideo.onmouseup = null;
    };

};


localVideo.ondragstart = function() {
    return false;
};
