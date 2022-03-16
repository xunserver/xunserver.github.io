// 定义变量status， value，reason
// 定义exector的两个参数， resolve 和 reject
// 执行exector时将 resolve 和 rejedt 作为参数
// then函数的resolvedCb和 rejectCb

function resolvePromsie(result, nextPromise, resolve, reject) {
    if(nextPromise === result) {
        return new Error('circel promise')
    }

    if(typeof result === 'Object' && result) {
        if(result instanceof MyPromise) {
            const called = false
            const then = result.then;
            then.call(result, (value) => {
                if(!called) {
                    resolvePromsie(value, nextPromise, resolve, reject)
                }
            }, (err) => {
                if(!called) {
                    resolvePromsie(value, nextPromise, resolve, reject)
                }
            })
        }
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

MyPromise.prototype.then = function(resolveCb, rejecteCb) {
    if(!resolveCb) {
        return this;
    }
    let nextPromise =  new MyPromise((resolve, reject) => {
        if(this.state === 'fulfilled') {
            let x = resolveCb(this.value)
            resolvePromsie(x, nextPromise, resolve, reject)

        } else if (this.state === 'rejected') {
            rejecteCb(this.reason)
        } else {
            this.resolveCbs.push(resolveCb);
    
            if(rejecteCb) {
                this.rejectCbs.push(rejecteCb)
            }
        }
    })

    return nextPromise
}

MyPromise.prototype.catch = function(rejecteCb) {
    if(!rejecteCb) {
        return this
    }

    if(this.state === 'rejected') {
        rejecteCb(this.reason)
    } else if (this.state === 'pending') {
        this.rejectCbs.push(rejecteCb)
    }
}

var a = new MyPromise((resolve, reject) => {
    resolve(1)
})

a.then(value => value + 1).then(console.log)