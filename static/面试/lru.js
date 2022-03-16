class LRU {
    cache = new Map();
    constructor(size) {
        this.size = size
    }
    get(key) {
        if(cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key)
            return value;
        }
    }
    put(key, value) {
        this.cache.delete(key)
        this.cache.set(key, value)
        if(this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value)
        }
        return value
    }

    getAll(){
        return this.cache.keys()
    }
}

const lru = new LRU(3);
lru.put(1);
lru.put(2);
lru.put(3);
lru.put(3);
lru.put(1);
lru.put(4);

console.log(lru.getAll())

