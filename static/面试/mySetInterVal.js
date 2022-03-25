function mySetInterVal(fn, a, b) {
    let timer
    const exector = (a, b) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn();
            exector(a + b, b);
        }, a);
    }

    exector(a, b)

    return () => clearTimeout(timer)
}

const xx = mySetInterVal(() => console.log(1), 1000, 1000);

setTimeout(() => {
    xx()
}, 7000);