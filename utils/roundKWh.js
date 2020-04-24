//round decimal to thousandth place
//numbers less than 0.001 are said to be less than 0.001

function roundKWh(num) {
  if (num < 0.001) {
    return 'less than 0.001';
  }

  return Math.round(num * 1000) / 1000;
}

module.exports = roundKWh;
