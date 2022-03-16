// 实现一个有最大并发请求的函数
const request = (name, cb, timer = 1000) => {
    setTimeout(() => {
        console.log(name);
        cb(name)
    }, timer);
}

const requestQueue = ((size) => {
    const fns = [];
    const results = [];
    let count = 0;

    const exector = () => {
        if(!fns.length) {
            return;
        }
        if(count >= size) {
            return
        }

        const fn = fns.shift();

        count++;
        fn(results, (value) => {
            results.push(value);
            count--;
            exector();
        })
    }

    return (requestFn) => {
        fns.push(requestFn)
        exector()
    }
})(2)

requestQueue((results, cb) => request(1, cb))
requestQueue((results, cb) => request(2, cb, 7000))
requestQueue((results, cb) => request(3, cb))
requestQueue((results, cb) => request(4, cb))

setTimeout(() => {
    requestQueue((results, cb) => request(5, cb))
}, 8000);