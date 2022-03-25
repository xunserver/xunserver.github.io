class Vue {
    construtor(options) {
        this.$options = options;

        const { data } = this.$options

        observe(data);


    }
}

class Dep {
    constructor() {
        this.subs = []
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

class Watcher {
    update() {
        console.log('update')
    }
}

function cb(params) {
    console.log('我被更新了')
}

function observe(obj, key, val) {
    // 这儿使用val闭包来保存值
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            return val
        },
        set(value) {
            if (value === val) return
            val = value;
            cb()
        }
    })
}


const component1 = new Vue({
    data: {
        age: 18,
        name: 'yangjiaxun'
    }

})