function MyPromise(exector) {
    this.status = 'pending';
    this.value = undefined;
    this.error = undefined;
    this.resolveCbs = [];
    this.rejectCbs = [];

    const resolve = (value) => {
        if(this.status === 'pending') {
            this.status = 'fullfilled';
            this.value = value;
            this.resolveCbs.forEach(cb => cb && cb(this.value))
        }
    }

    const reject = (error) => {
        if(this.status === 'pending') {
            this.status = 'rejected';
            this.error = error
        }
    }

    try {
        exector(resolve, reject)
    } catch(err) {
        this.error = err
        reject(this.error)
    }
}

MyPromise.prototype.then = function(resolveCb, rejectedCb) {
    if (this.status === 'pending') {
        this.resolveCbs.push(resolveCb);
        this.rejectCbs.push(rejectedCb);
        return;
    }

    setTimeout(() => {
        if(this.status === 'fullfilled') {
            return resolveCb(this.value)
        } else if (this.status === 'rejected') {
            return rejectedCb(this.error);
        }
    }, 0);
}

const test = new MyPromise((resolve, reject) => {
    console.log('init');
    setTimeout(() => {
        resolve('123')
    }, 20);
});

test.then((value) => {
    console.log('resolved value:' + value)
}, (error) => {
    console.log('reject value: ' + error)
})

console.log('aaa')