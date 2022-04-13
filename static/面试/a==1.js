// ((val) => {
//     Object.defineProperty(global, 'a', {
//         get() {
//             return val++;
//         }
//     })
// })(1)

const a = {
    value: 1,

    toString() {
        return this.value++;
    }
}

console.log(a == 1 && a == 2 && a == 3)