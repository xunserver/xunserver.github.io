class Event {
    events = Object.create(null)

    on(name, fn) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        this.events.push({
            fn
        })
    }

    emit(name, ...args) {
        if (!this.events[name]) {
            throw new Error('no event')
        }

        const context = args.pop()

        this.events[name].forEach(({ fn, once }, index) => {
            if(!fn) {
                return;
            }
            fn.apply(context, args);
            if (once) {
                this.events[name][index] = {}
            }
        });
    }
    off(name, fn) {
        const fnIndex = (this.events[name] || []).findIndex(item => fn === item.fn);

        if (fnIndex !== -1) {
            this.events[name].splice(fnIndex, 1)
        }
    }
    once(name, fn) {
        this.events[name] ??= name;
        this.events[name].push({ fn, once: true })
    }
}