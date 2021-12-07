function cloneIteration(source) {
    if(!isObject(source)) {
        return source
    }

    const root = Array.isArray(source) ? [] : {};

    const queueList = [{
        parent: root,
        key: undefined,
        data: source
    }]

    while(queueList.length) {
        const node = queueList.pop()
        const { parent, key, data } = node;

        if (!isObject(data)) {
            parent[key] = data;
            continue;
        }
        
        let result = parent;
        if(key !== undefined) {
            result = parent[key] = {};
        }

        console.log(queueList.length)

        Object.entries(data).forEach(([key, value]) => {
            queueList.push({
                parent: result,
                data: value,
                key
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