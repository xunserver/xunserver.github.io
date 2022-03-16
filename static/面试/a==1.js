// var a = {
//     value: 1,
//     toString(){
//         return this.value++;
//     }
// }

let val = 1
Object.defineProperty(global, 'a', {
    get() {
        return val++
    }
})



console.log(a == 1 && a == 2 && a == 3)