W = 1000;
H = 1200;

R = 100;
TAU = 2 * Math.PI;
asteroidAngleOffset = TAU * Math.random();

function isOffscreen(x, y, offset = 0) {
  if (x < 0 - offset) return true;
  if (y < 0 - offset) return true;
  if (x > W + offset) return true;
  if (y > H + offset) return true;
  return false;
}

function clamp(min, x, max) {
  if (x <= min) return min;
  if (x >= max) return max;
  return x;
}

function normRand(spread) {
  return (Math.random() - Math.random()) * spread;
}

function uniRand(min, max) {
  const range = max - min;
  return Math.random() * range + min;
}

bits = [];
asteroids = [];
airCan = {};