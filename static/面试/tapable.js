class tapable {
    cbs = []
    tap(fn) {
        this.cbs.push(fn)
    }
    callAsync(callback,...args) {
        callback(this.call(...args))
    }
    promise(...args) {
        return Promise.resolve(this.call(...args))
    }
}

class SyncHook extends tapable {
    call(...args) {
        return this.cbs.map(cb => cb(...args))
    }
}

class SyncBailHook extends tapable {
    call(...args) {
        let i = -1;
        let result = [];
        while(this.cbs[++i]) {
            const fnResult = this.cbs[i](...args);
            if(fnResult === undefined) {
                return result
            }
            result.push(fnResult)
        }
    }
}

class SyncWaterHook extends tapable {
     call(args) {
        const result = [];
        this.cbs.reduce((lastResult, current) => {
            lastResult = current(result)
            result.push(lastResult)
            return lastResult
        }, args)
     }
}

class SyncLoopHook extends tapable {
    call(args) {
        let i = -1;
        let result = [];
        while(this.cbs[++i % this.cbs.length]) {
            const fnResult = this.cbs[i % this.cbs.length](...args);
            if(fnResult === undefined) {
                return result
            }
            result.push(fnResult)
        }
    }
}

class SomeBody {
    constructor() {
        this.hooks = {
            sleep: new SyncHook()
        }
    }
    sleep() {
        this.hooks.sleep.call('some body')
        this.hooks.sleep.callAsync(() => {}, 'some body')
    }
}

const personA = new SomeBody();
personA.hooks.sleep.tap(function(name) {
    console.log(1, name)
})
personA.hooks.sleep.tap(function(name) {
    console.log(2, name)
})

personA.sleep()


// class SyncBailH