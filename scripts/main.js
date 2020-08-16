// retrieve HTML elements
var playground = document.getElementsByClassName('playground-canvas');
var footer = document.getElementsByClassName('footer-canvas');

// setup
var space = ' ';

var pathHeight = 8,
    pathWidth = 1024,
    path1stPoint = 'M0,0' + space,
    path2ndPoint = 'L1024,0' + space,
    pathLastPoint = 'Z';

// generate a random number between two extremes
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// generate an array of points (more or less randomized)
function generatePoints(pointNumber, deltaX, minY, maxY) {

  let inputPoints = [],
      outputPoints = [];

  for (var i = pointNumber; i >= 0; i--) {
    inputPoints.push(0 + Math.round((pathWidth / pointNumber * i)));
  }

  inputPoints.forEach(function (point, i) {
    if ((i === 0) || (i === inputPoints.length - 1)) {
      outputPoints.push(inputPoints[i].toString() + ',' + getRandomInt(minY, maxY).toString());
    } else {
      outputPoints.push(getRandomInt(inputPoints[i] - deltaX, inputPoints[i] + deltaX).toString() + ',' + getRandomInt(minY, maxY).toString());
    }
  });

  return outputPoints;
};

// combine an array of points generated using generatePoints into a path
function combinePoints(generation) {
  let points = generation;

  let path = path1stPoint;
  path += path2ndPoint;

  points.forEach(function (point, i) {
    path += 'L' + points[i] + space;
  });

  path += pathLastPoint;

  return path;
};

// create an SVG
function createSVG(edgeStart, edgeEnd, className) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('width', pathWidth);
  svg.setAttribute('height', pathHeight);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('viewBox', '0 0 1024 8');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.appendChild(path);
  path.setAttribute('d', edgeStart);

  let animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  path.appendChild(animate);
  animate.setAttribute('attributeName', 'd');
  animate.setAttribute('dur', '100ms');
  animate.setAttribute('fill', 'freeze');
  animate.setAttribute('from', edgeStart);
  animate.setAttribute('repeatCount', '1');
  animate.setAttribute('to', edgeEnd);

  return svg;
};

// remove previously prepended SVGs
function removeSVGs() {
  if (document.body.contains(document.getElementsByClassName('header-edge')[0])) {
    document.getElementsByClassName('header-edge')[0].remove();
    //console.log('Header cleared.');
  };
  if (document.body.contains(document.getElementsByClassName('footer-edge')[0])) {
    document.getElementsByClassName('footer-edge')[0].remove();
    //console.log('Footer cleared.');
  };

};

// prepend SVGs
function prependSVGs(pointNumber, deltaXStart, minYStart, maxYStart, deltaXEnd, minYEnd, maxYEnd, ) {
  // create the playground random edge
  playground[0].prepend(
    createSVG(
      combinePoints(generatePoints(pointNumber, deltaXStart, minYStart, maxYStart)),
      combinePoints(generatePoints(pointNumber, deltaXEnd, minYEnd, maxYEnd)),
      'header-edge'
    )
  );

  // create the footer random edge
  footer[0].prepend(
    createSVG(
      combinePoints(generatePoints(pointNumber, deltaXStart, minYStart, maxYStart)),
      combinePoints(generatePoints(pointNumber, deltaXEnd, minYEnd, maxYEnd)),
      'footer-edge'
    )
  );
};

enquire
.register("screen and (min-width:75em)", function() {
  // 1200 < width | 16*75 < width
  console.log("1200 < width");

  removeSVGs();

  prependSVGs(11, 0, 0, 0, 16, 0, 8);
})
.register("screen and (min-width:60em) and (max-width:75em)", function() {
  // 960 < width < 1200 | 16*60 < width < 16*75
  console.log("960 < width < 1200");

  removeSVGs();

  prependSVGs(9, 0, 0, 0, 16, 0, 8);
})
.register("screen and (min-width:45em) and (max-width:60em)", function() {
  // 720 < width < 960 | 16*45 < width < 16*60
  console.log("720 < width < 960");

  removeSVGs();

  prependSVGs(7, 0, 0, 0, 16, 0, 8);
})
.register("screen and (min-width:30em) and (max-width:45em)", function() {
  // 480 < width < 720 | 16*30 < width < 16*45
  console.log("480 < width < 720");

  removeSVGs();

  prependSVGs(5, 0, 0, 0, 16, 0, 8);
})
.register("screen and (max-width:30em)", function() {
  // width < 480 | width < 16*30
  console.log("width < 480");

  removeSVGs();

  prependSVGs(3, 0, 0, 0, 16, 0, 8);
});
