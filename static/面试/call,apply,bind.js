function isFunction(target) {
    return typeof target === 'function'
}

function getContext(context) {
    return context instanceof Object ? context : global
}

function getArgs(args) {
    return Array.prototype.slice.call(args, 1)
}

Function.prototype.myCall = function(context) {
    const fn = this;
    if(!isFunction(fn)) {
        throw new Error('not function')
    }
    const args = getArgs(arguments);
    context = getContext(context);

    const _fnName = Symbol();
    context[_fnName] = fn;
    const result = eval(`context[_fnName](${args.map((_, i) => `args[${i}]`)})`);
    delete context[_fnName];
    return result
}

Function.prototype.myApply = function(context, args= []) {
    if(!isFunction(this)) {
        throw new Error('not function')
    }
    if(Array.isArray(args)) {
        context = getContext(context)
        return eval(`this.myCall(context, ${args})`)
    } 
    throw new Error('arguments error, must be Array')
}

Function.prototype.myBind = function(context) {
    if(!isFunction(this)) {
        throw new Error('not function')
    }
    const fn = this;
    const initArgs = getArgs(arguments);
    context = getContext(context);

    const fBind = function() {
        const args = getArgs(arguments);
        return fn.myApply(this instanceof fn ? this : context, initArgs.concat(args))
    }

    const tmpFn = function() {};
    tmpFn.prototype = fn.prototype;
    
    fBind.prototype = new tmpFn();

    return fBind
}

const testFn = function(...args) {
    console.log(this.a, args.length)
}
testFn.myApply({a: '123'});
testFn.myApply();
testFn.myApply(123, [123,33]);

testFn.myCall(123, [123,33]);

testFn.myBind({a: '123'})()

a = new (testFn.myBind({a: '123'}))

console.log(a.a);

