vaiimedia.onmousedown = function(event) {
    vaiimedia.style.position = 'absolute';
    vaiimedia.style.zIndex = 1000;
    document.body.appendChild(vaiimedia);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        vaiimedia.style.left = pageX - vaiimedia.offsetWidth / 2 + 'px';
        vaiimedia.style.top = pageY - vaiimedia.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    vaiimedia.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        vaiimedia.onmouseup = null;
    };

};


vaiimedia.ondragstart = function() {
    return false;
};
