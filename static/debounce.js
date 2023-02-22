// 防抖函数
function debounce(fn, awaitTime) {
  let timer = null;
  let later = function(context, ...args) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      timer = null;
      fn.apply(context, args);
    }, awaitTime);
  };
  return function() {
    later(this, ...arguments);
  };
}

// 节流

function throttle(fn, awaitTime, isPre) {
  let firstTime;
  let later = function(context, ...args) {
    let now = new Date();
    if (!firstTime || now - firstTime > awaitTime) {
      fn.apply(context, args);
    }
    firstTime = now;
  };
  return function() {
    return later(this, ...arguments);
  };
}

let a = throttle(function() {
  console.log(123);
}, 1000);

function generator(cb) {
  return {};
}
