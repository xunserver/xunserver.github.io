const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && obj;

/**
 * 深拷贝
 */
 const deepClone = (target, cache = new WeakMap()) => {
    if(typeof target !== 'object' || !target) {
        return target
    }

    if(cache.has(target)) {
        console.log
        return cache.get(target)
    }

    const result = Array.isArray(target) ? [] : Object.create(null);
    cache.set(target, result)

    Object.entries(target).forEach(([key, value]) => {
        result[key] = deepClone(value, cache);
    })


    return result;
}

/**
 * 合并对象
 */
const mergeObject = (obj1, obj2, isConcatArray = true) => {
    const result = isObject(obj1) ? deepClone(obj1) : {}; 
    if (!isObject(obj2)) {
        return result;
    }

    Object.keys(obj2).reduce((acc, key) => {
        const left = obj1[key]
        const right = obj2[key];
        if (obj1 && obj1.hasOwnProperty(key) && isObject(obj2[key])) {
            acc[key] = mergeObject(left, right, isConcatArray)
        } else if (isConcatArray && Array.isArray(left) && Array.isArray(right)) {
            acc[key] = left.concat(right)
        } else {
            acc[key] = right;
        }
    }, result)

    return result;
}


const isEmpty = (target) => {
    if([null, undefined, '', 0].includes(target)) {
        return true
    }

    if(Array.isArray(target) && target.length === 0) {
        return true
    }
    
    if(typeof target === 'object') {
        return Object.entries(target).every(([_, value]) => isEmpty(value))
    }

    return false
}

console.log(isEmpty([0, '', null, undefined, {a: 23}]))