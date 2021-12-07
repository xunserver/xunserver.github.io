const add = (function () {
    let result = 1;
    return function(x) {
        if (!x && x !== 0) {
            return result
        }
        result *= x;
        return arguments.callee
    }
})()

add(1)
add(2)
add(3)
console.log(add())