// retrieve HTML elements
var playground = document.getElementsByClassName('playground-canvas');
var footer = document.getElementsByClassName('footer-canvas');

// create an array of initial points
var points = [];

for (var i = 9; i > 0; i--) {
  points.push(0 + (128*i));
}

// generate a random number between two extremes
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// generate an array of random points
function generateRandomPoints(seed, minSpread, maxSpread) {
  let randomPoints = []

  points.forEach(function (point, i) {
    if ((i === 0) || (i === points.length - 1)) {
      randomPoints.push(points[i].toString() + ' ' + getRandomInt(minSpread, maxSpread).toString());
    } else {
      randomPoints.push(getRandomInt(points[i] - seed, points[i] + seed).toString() + ' ' + getRandomInt(minSpread, maxSpread).toString());
    }
  });

  return randomPoints;
};

// combine an array of random points into a path
function combineRandomPoints() {
  let points = generateRandomPoints(16, 0, 8);

  let path = 'M0 0 L1024 0 L' + points[0] + ' L' + points[1] + ' L' + points[2] + ' L' + points[3] + ' L' + points[4] + ' L' + points[5] + ' L' + points[6] + ' L' + points[7] + ' L' + points[8] + 'L0 0 V0Z';

  return path;
};

var edgeStart = 'M0 0 L1024 0 L1024 0 L896 0 L768 0 L640 0 L512 0 L384 0 L256 0 L128 0 L0 0 V0Z';

// create an SVG
function createSVG(edgeStart, edgeEnd, className) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('width', 1024);
  svg.setAttribute('height', 8);
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

// create the playground random edge
playground[0].prepend(createSVG(edgeStart, combineRandomPoints(), 'headerEdge'));

// create the footer random edge
footer[0].prepend(createSVG(edgeStart, combineRandomPoints(), 'footerEdge'));
