const isObject = target => typeof target === 'object' && target

const objectLevel = (obj, cache = new WeakMap) => {
    if(cache.has(obj)) {
        return 0
    }
    if(!isObject(obj)) {
        return 1;
    }
    
    cache.set(obj, 1);
    
    const levels = Object.entries(obj).map(([, childObj]) => objectLevel(childObj, cache))



    return Math.max(...(levels.length > 0 ? levels : [0])) + 1;
}

var a = {};
a.a = a;

console.log(objectLevel(a))