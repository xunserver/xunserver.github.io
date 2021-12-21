// 延迟执行版本
function debounce(func, delay = 500) {
    let timer = null;
    return function() {
        let that = this;
        clearTimeout(timer)
        const args = Array.prototype.slice(arguments, 0)
        timer = setTimeout(function() {
            func.apply(that, args)
        }, delay);
    }
}

// 非延迟执行版本
function debounce1(func, delay, immediate = true) {
    let timestamp = null;
    return function() {
        const now = Date.now()
        if(!timestamp || now - delay >= timestamp) {
            func.call(this, ...arguments)
        }
        timestamp = now;
    }
}


function throttle(func, delay) {
    let timer = null;
    return function() {
        if(~\timer) {

        }
    }
}