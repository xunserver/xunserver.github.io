const compose = (...fns) => {
    if(fns.length === 0) {
        throw new Error('至少一个函数')
    }
    if(fns.length === 1) {
        return function(...args) {
            fns[0].apply(this, args)
        }
    }

    return fns.reduce((a, b) => {
        return (...args) => b(a(...args))
    }) 
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

const fn1 = (lastResult) => () => {

}

const fn2 = (lastResult) => () => {

}



console.log(a(1, 33))