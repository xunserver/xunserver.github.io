function _new(fn, ...args) {
    const obj = Object.create(fn.prototype); // 注意原型需要在构造函数之前赋值
    const result = fn.apply(obj, args);
    return typeof result === 'object' ? (result || obj) : obj
}