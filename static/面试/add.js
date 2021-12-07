const add = (function () {
    let result = 0;
    return function (x) {
        if(!x && x !== 0) {
            console.log(result)
        }
        result += x;
        return arguments.callee
    }
})()

add(1)
add(3)
add(9)
add(  '')