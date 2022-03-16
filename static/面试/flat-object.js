const { isObject } = require("./utils");

const flat = (target, _prefix = '', result = Object.create(null), cache = new WeakMap) => {
    if(!isObject(target)) {
        return target
    }

    if(cache.has(target)) {
        return target
    }

    cache.set(target)

    prefix = _prefix ? _prefix + '.' : _prefix

    Object.entries(target).forEach(([key, value]) => {
        if(!isObject(value)) {
            result[`${prefix}${key}`] = value
        } else {
            flat(value, `${prefix}${key}`, result, cache)
        }
    })

    return result;
}

var a = {}
a.a = a

console.log(flat(a))