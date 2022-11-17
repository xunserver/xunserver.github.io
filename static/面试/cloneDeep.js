const isObject = target => typeof target === 'object' && target
const deepClone1 = (target) => {
    if(!isObject(target)) {
        return target
    }

    const cache = new Map()

    const root = {};
    const queue = Object.entries(target).map(([key, value]) => ({
        parent: root,
        key,
        value
    }));

    while(queue.length) {
        const { parent, key, value } = queue.pop();
        
        if(!isObject(value)) {
            parent[key] = value;
        } else {
            if(cache.has(value)) {
                parent[key] = cache.get(value);
                continue
            }
            const result = Array.isArray(value) ? [] : {};
            parent[key] = result;
            cache.set(value, result)
            queue.push(...Object.entries(value).map(([key, value]) => ({
                parent: result,
                key,
                value
            })))
        }
    }

    return root
}
const a = {
    a:123,
    b: {
        a: 123
    },
    c: [1, {a:123}, [3]]
}
a.a = a
console.log(deepClone(a));


const source = {
    a: 1,
    b: null,
    c: {
        a: 1,
        b: 2,
        c: {
            a: 1
        }
    },
    d() {
        return 'd'
    },
    e: [undefined, {
        a: 1,
        b: [1,2,3,4]
    }],
    f: Symbol('f'),
    dd: [{a: [1]}]
}

function isObject(obj) {
    return typeof obj === 'object' && obj
}

function cloneDeep(source, cache = new WeakMap) {
    if(!isObject(source)) {
        return source
    }

    if (cache.has(source)) {
        return cache.get(source)
    }

    const target = Array.isArray(source) ? [] : {};
    cache.set(source, target)
    Object.entries(source).forEach(([key, value]) => {
        target[key] = cloneDeep(value, cache);
    })

    return target
}

console.log(JSON.stringify(cloneIteration(source)))