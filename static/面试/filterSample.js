const isObject = target => typeof target === 'object' && target
const deepClone = (target) => {
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
