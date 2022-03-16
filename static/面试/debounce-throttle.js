// debounce节流和throttle防抖
// 节流用于防止重复计算， 比如调整窗口大小上面
// 防抖用于控制动作频率， 比如规定2s 只能发送一个请求

// 判断计时器是否存在，不存在执行函数，防抖和节流的区别是 定时器什么时候更新， 节流是始终更新定时器，防抖时定时不存在才更新

const debounce = (fn, delay, immediate) => {
    let timer = null;
    return function(...args) {
        if(!timer) {
            fn.apply(this, args)
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null
        }, delay);
    }
}


const throttle = (fn, interval) => {
    let timer = null;
    return function(...args){
        if(!timer) {
            fn.apply(this, args)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            }, interval);
        }
    }
}


function fnA(a) {
    console.log(...arguments, this.a)
}

const da = throttle(fnA, 1000, false);
da('1', '3232')
da('2', '3232')
da('3', '3232')
setTimeout(() => {
    da('13')
}, 1000);