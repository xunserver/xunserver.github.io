const isFunction = t => typeof t === 'function'

function resolvePromise(result, nextPromise, resolve, reject) {
    if(result instanceof MyPromise) {  // 返回值也是promise
        result.then(resolve, reject)
    } else {
        resolve(result)
    }
}

function MyPromise(exector) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    this.resolveCbs = []
    this.rejectCbs = []

    let resolve = (value) => {
        if(this.state !== 'pending') {
            return 
        }
        this.value = value;
        this.state = 'fulfilled';

        this.resolveCbs.forEach(cb => cb(value))
    }

    let reject = (reason) => {
        if(this.state !== 'pending') {
            return 
        }
        this.reason = reason;
        this.state = 'rejected'

        this.rejectCbs.forEach(cb => cb(reason))

    }
    try {
        exector(resolve, reject)
    }catch(err) {
        reject(err)
    }
}

MyPromise.prototype.then = function(resolveCb, rejectCb) {
    if(!isFunction(resolveCb)) {
        return this
    }
    let nextPromise =  new MyPromise((resolve, reject) => {
        if(this.state === 'fulfilled') {
            setTimeout(() => {
                const x = resolveCb(this.value)
                if(x === this) {
                    throw new Error('循环promise')
                }
                resolvePromise(x, nextPromise, resolve, reject)   
            });
        } else if (this.state === 'rejected') {
            rejectCb(this.reason)
        } else {
            this.resolveCbs.push(resolveCb);
    
            if(rejectCb) {
                this.rejectCbs.push(rejectCb)
            }
        }
    })

    return nextPromise
}

MyPromise.prototype.catch = function(rejectCb) {
    if(!rejectCb) {
        return this
    }

    if(this.state === 'rejected') {
        rejectCb(this.reason)
    } else if (this.state === 'pending') {
        this.rejectCbs.push(rejectCb)
    }
}

var a = new MyPromise((resolve, reject) => {
    resolve(1)
})


b = a.then(value => value + 1)

setTimeout(() => {
    console.log(b);
}, 0);

Promise.myAll = function (list) {
    let count = 0;
    const result = [];

    return new Promise((resolve, reject) => {
        for(let i = 0; i < list.length; i++) {
            list[i].then(res => {
                count++;
                result[i] = res;
    
                if(count >= list.length) {
                    resolve(result)
                }
            }).catch(reject)
        }
    })
}