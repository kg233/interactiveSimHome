function urlMaker(base, params) {
  let res = base;
  if (params) {
    res += '?';
    for (let param of params) {
      res += param + '&';
    }
    res = res.substring(0, res.length - 1);
  }
  return res;
}

module.exports = urlMaker;
