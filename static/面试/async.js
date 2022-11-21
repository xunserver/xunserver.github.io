// 将yield 理解成一个函数，执行后面的语句返回值给前面
// 执行一次next(value)，value相当于yield函数的返回值，语句会执行到下一个yield位置停住

function sleep(delay = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay * 2)
        }, delay);
    })
}
async function demo() {
    let a = await Promise.resolve(1000);
    console.log(a)
    let b = await sleep(a);
    console.log(b)
    let c = await 3;
    console.log(c)
}

function myAwait(fn) {
    return function() {
        const executor = fn.apply(this, arguments);
        const step = (type, ...args) => {
            return new Promise((resolve, reject) => {
                let result;
                try {
                    result = executor[type](...args)
                } catch(err) {
                    reject(error)
                }
                if(result.done) {
                    return resolve(result.value)
                }

                return Promise.resolve(result.value).then(value => step('next', value)).catch(err => step('throw',  err))
            })
        }

        return step('next')
    }
}

myAwait(function*(n) {
    let a = yield Promise.resolve(n);
    console.log(a)
    let b = yield sleep(a);
    console.log(b)
    let c = yield 3;
    console.log(c);
    return 123
})(3000).then(console.log)
