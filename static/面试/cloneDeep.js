function isObject(obj) {
    return typeof obj === 'object' && obj
    // return Object.prototype.toString.call(obj) === '[object Object]'
}

function cloneDeep(source, cache = new WeakMap()) {
    if(!isObject(source)) {
        return source
    }

    if(cache.has(source)) {
        return cache.get(source)
    }

    const target = Array.isArray(source) ? [] : {};
    cache.set(target)

    Object.entries(source).forEach(([key, value]) => {
        target[key] = cloneDeep(value, cache)
    })
    return target
}

function cloneDeepIteration(source) {
    const root = {}
    const queueList = [{
        parent: root,
        data: source,
        key: undefined
    }];

    while(queueList.length) {
        const node = queueList.pop()
        const { key, data, parent } = node;

        if(!isObject(data)) {
           if(key === undefined) {
                return source
           }
           parent[key] = data;
           continue
        }

        let res = parent

        if (key !== undefined) {
            res = parent[key] = Array.isArray(data) ? [] : {}
        }
        

        Object.entries(data).forEach(([k, v]) => {
            queueList.push({
                parent: res,
                key: k,
                data: v
            })
        })
        

    }

    return root

} 

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

console.log( JSON.stringify(cloneDeepIteration(source)))