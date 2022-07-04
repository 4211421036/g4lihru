var drawMainStem = function() {
  var paths = document.querySelectorAll('.main-stem');
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var length = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s 0s ease-in-out';
    path.style.strokeDashoffset = '0';
  }
}

var drawStems = function() {
  var paths = document.querySelectorAll('.outer-stems');
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var length = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 3s 1s ease-in-out';
    path.style.strokeDashoffset = '0';
  }
}

var drawLeaves = function() {
  var paths = document.querySelectorAll('.leaves path');
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var length = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s 2.5s ease-in-out';
    path.style.strokeDashoffset = '0';
  }
}

drawMainStem();
drawStems();
drawLeaves();


document.body.onclick = function() {
  drawMainStem();
  drawStems();
  drawLeaves();
};
