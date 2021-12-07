function MyPromise(fn) {
    this.value = null;
    this.error = null;
    this.status = 'pendding'; // resolved rejected
    this.successCb = () => {};
    this.failCb = () => {};

    const resolve = (value) => {
        setTimeout(() => {
            if(this.status === 'pendding') {
                this.value = value;
                this.status = 'resolved'
                this.successCb(value)  
            }
        });
    }

    const reject = (error) =>  {
        setTimeout(() => {
            if(this.status === 'pendding') {
                this.error = error;
                this.status = 'rejected'
                this.failCb(error)
            }
        });
    }

    fn(resolve, reject)
}

MyPromise.prototype.then = function(fn) {
    this.successCb = fn
    const result = this.successCb(this.value)
    return new MyPromise(resolve => {
        if(this.status === 'resolved') {
            resolve(result)
        }
    })
}

MyPromise.prototype.catch = function(fn) {
    this.failCb = fn
    if(this.status === 'rejected') {
        this.failCb(this.error)
    }

    return this
}

MyPromise.reject = function() {
    
}

MyPromise.resolve = function() {
     
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(234)   
    }, 1000);
})

promise.then(console.log)