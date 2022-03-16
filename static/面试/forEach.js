// const forEach = (arr, fn) => {
//     for(let i = 0, len = arr.length; i < len; i++) {
//         fn.call(arr, arr[i], i, arr)
//     }
// }


// forEach([1,2], console.log)
// forEach([1,2], (item, index, context) => {
//     this = 
//     console.log(item + 1)
// });

// [1,2].map((item, index, arr) => {
//     return item * 2;
// })

// const map = (arr, fn) => {
//     let newArr = []
//     for (let i = 0; i< arr.length; i++) {
//        newArr.push(fn(arr[i], i, arr))
//     }
//     return newArr;
// }

// map([1,2], (item) => {
//    return item * 2;
// })
// console.log(map([1,2], (item,index, context) => {
//     return {
//         value: item * 2,
//         index,
//         context
//     }
//  }))

function remove(arr, index) {
    for (let i = index; i < arr.length; i++) {
        arr[i] = arr[i + 1]
    }
    arr.length = arr.length -1;
    return arr;
}
console.log(remove([1,2,3,4,5], 2))

function add(arr, index, target) {
    for(let i = arr.length; i > index; i--) {
        arr[i] = arr[i - 1];
    }

    arr[index] = target
    
    return arr
}

function splice(arr, index, target) {
    remove(arr, index)
    add(arr, index, target);
    return arr
}

console.log(splice([1,2,3,4,5], 1, 4))