const compose = (...fns) => {
    if(fns.length === 0) {
        throw new Error('至少一个函数')
    }
    if(fns.length === 1) {
        return function(...args) {
            fns[0].apply(this, args)
        }
    }

    return function(...args) {
        return fns.slice(1).reduce((pre, next) => {
            return next.call(this, pre);
        }, fns[0].apply(this, args))
    }
}

const curring = (fn, ...initArgs) => {
    if(typeof fn !== 'function') {
        throw new Error('invalid function argument')
    }
    const argsLength = fn.length;
    const args = initArgs;
    
    return function(...restArgs) {
        if(args.length + restArgs.length < argsLength) {
            args.push(...restArgs)
        } else {
            return fn(...args, ...restArgs)
        }
    }
}


const f1 = (x, y) => x + y + 1; 
const f2 = (x) => x + 2; 
const f3 = (x) => x + 3; 
const f4 = (x) => x + 4; 

var a = curring(f1, 1,)



console.log(a(1, 33))