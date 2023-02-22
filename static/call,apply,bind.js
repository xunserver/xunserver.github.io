Function.prototype.myCall = function(context) {
  context = context || window;
  if (typeof this !== "function") {
    return new Error("type error");
  }
  let args = [...arguments].slice(1);
  const fn = Symbol("fn");
  context[fn] = this;
  return context[fn](...args);
};

Function.prototype.myApply = function(context) {
  context = context || window;
  if (typeof this !== "function") {
    return new Error("type error");
  }
  const fn = Symbol("fn");
  context[fn] = this;
  let result;
  if (arguments[1]) {
    result = context[fn](...arguments[1]);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

Function.prototype.myBind = function(context) {
  context = context || window;
  let fn = this;
  let args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return fn(...arguments, ...args);
    } else {
      return fn.apply(context, args.concat(...arguments));
    }
  };
};

// new 伪代码

function create(fn) {
  let obj = Object.create(null);
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, [...arguments].slice(1));
  return typeof result === "object" ? result || obj : obj;
}
