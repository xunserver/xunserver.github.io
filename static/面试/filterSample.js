const filterSample = (arr) => {
    if(!Array.isArray(arr) || arr.length <= 1) { return arr; } const cache="new" map(); arr.reduce((acc, cur)> {
        if(!cache.has(cur)) {
            acc.push(cur);
            cache.set(cur, true);
        }

        return acc;
    }, [])
}

var a = []
console.log([...new Set([a, a, 1])])</=>