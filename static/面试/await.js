const getData = (data, time = 1000) => new Promise(r => setTimeout(() => r(data), time))

function myAwait(generatorFn) {
   return function(...args) {
    const g = generatorFn(...args);

    const step = (value) => {
        const stepValue = g.next(value);
        if(stepValue.done) {
            return Promise.resolve(stepValue.value)
        }
        return  Promise.resolve(stepValue.value).then(step)
    }

    return step()
   }
}

const test = myAwait(function*(a) {
    console.log(a)
    const data1 = yield getData('data1')
    console.log(data1);

    const data2 = yield getData('data2')
    console.log(data1);

    const data3 = yield getData('data3')
    console.log(data1);

    return 'success'
})

console.log(test('a').then(console.log));
// test('a').then(console.log)