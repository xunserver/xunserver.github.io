const getFunctionArgs = (funcArgs, startIndex = 0) => {
    const result = []
    for(let i = startIndex, len = funcArgs.length; i < len; i++) {
        result.push(funcArgs[i])
    }

    return result;
}

const checkFunction = (fn) => {
    return typeof fn === 'function'
}

Function.prototype.myCall = function(context) {
    if(!(checkFunction(this))) {
        throw new Error('not function');
    }

    const restArgs = getFunctionArgs(arguments, 1);
    context = context || globalThis;
    context.__fn = this;
    const result = eval(`context.__fn(${restArgs})`)
    delete context.__fn
    return result
}

Function.prototype.myApply = function(context, args = []) {
    if(!checkFunction(this)) throw new Error('not function');
    context = context || globalThis;
    context.__fn = this;
    const result = eval(`context.__fn(${args})`)
    delete context.__fn
    return result
}

Function.prototype.myBind = function (context, ...initArgs) {
    if(!checkFunction(this)) throw new Error('not function');
    const fn = this;

    const temp = function () {}
    temp.prototype = this.prototype;

    const fbind = function (...args) {
        return fn.myCall(this instanceof fn ? this : context, ...initArgs, ...args)
    }

    fbind.prototype = new temp()

    return fbind
}

function newFn(constructor, ...args) {
    const obj = Object.create(null);
    obj.__proto__ = constructor.prototype;
    constructor.myApply(obj, args)

    return obj
}

function log(a) {
   return {
       a: this,
       ...arguments
   }
}

// let a = log.myBind({
//     a: 1
// })

// b = new a(2,3,4,5)
// console.log(b)

function test() {
    return {
        a: this.a
    }
}

test.prototype.a = 1
const test1 = new test

console.log(test1.a)

test.prototype.a = 2

console.log(test1.a)

