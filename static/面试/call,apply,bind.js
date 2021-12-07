function checkFunction(fn) {
    return typeof fn === 'function'
}

function getArgs(args, startIndex, name = 'args') {
    const result = []
    for( let i = startIndex; i < args.length; i++) {
        result.push(`${name}[${i}]`)
    }

    return  result
}

Function.prototype.myCall = function(context) {
    context = context || global
    const fn = this;
    if(!checkFunction(fn)) {
        throw new Error('not function')
    }

    const args = getArgs(arguments, 1)

    const fnName = Symbol('fnName')

    context[fnName] = fn;
    const result = eval(`context[fnName](${args})`);
    delete context[fnName]
    return result
}

Function.prototype.myApply = function (context, args) {
    const fn = this;
    context = context || global;

    const _args = getArgs(args, 0, 'args')

    context.fn = fn;
    const result = eval(`context.fn(${_args})`)
    delete context.fn
    return result
}

Function.prototype.myBind = function (context, ...initArgs) {
    if(!checkFunction(this)) {
        throw new Error('not function')
    }
    context = context || global
    const fn = this

    const tempFn = function () {}
    tempFn.prototype = this.prototype

    const fBind = function(...args) {
        return fn.myApply(this instanceof fn ? this : context, initArgs.concat(args))
    }

    fBind.prototype = new tempFn

    return fBind;
}

function newFn(fn, ...args) {
    if(!checkFunction(fn)) {
        throw new Error('not function')
    }

    const obj = Object.create(null)
    obj.__proto__ = fn.prototype;

    const result = fn.myApply(obj, args);

    return (typeof result === 'object' ? result : obj) || obj
}

function log(...args) {
    this.c = 1
    console.log(this.a, ...args)
    
}

log.prototype = {
    c: 1
}

const a = {
    a: 1
}

const Log = log.myBind(a, [2, 3 ,4, { a: 1 }])

console.log(new Log)