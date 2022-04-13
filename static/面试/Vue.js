class Vue {
    constructor(options) {
        this.$options = options;
        observe(this.$options.data);

        const root = document.querySelector(this.options.el)
        this.compile(root)
    }

    compile(node) {
        [].forEach.call(node.childNodes, child => {
            if(!child.firstElementChild && /\{\{.*\}\}/.test(child.innerHTML)) {
                const watcher = new Watcher(child);
                watcher.updatet(this.data[key])
            } else  if (child.firstElementChild){
                this.compile(child)
            }
        })
    }

}

function observe(data) {
    Object.keys(data).forEach(key => {
        let value  = data[key];
        const dep = new Dep;
        Object.defineProperty(data, key, {
            get() {
                dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if(newValue === value) return
                value = newValue;
                dep.notify(value)
            }
        })
    })
}

class Dep {
    sub = []
    
    addSub(watcher) {
        this.sub.push(watcher);
    }

    notify(value) {
        this.sub.forEach(item => item.update(value))
    }
}

class Watcher {
    constructor(node) {
        this.node = node;
        Dep.target = this;
    }

    update(value) {
        this.node.innerHTML = value
    }
}