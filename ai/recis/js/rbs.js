var video = document.querySelector("#videoRECIS");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(function(stream) {
            video.srcObject = stream;        
            $("#videoRECIS").draggable();
        })
        .catch(function(err0r) {
            console.log("Something went wrong!");
        });
}
