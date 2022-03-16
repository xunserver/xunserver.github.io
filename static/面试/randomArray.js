const random = (arr) => {
    if(arr.length <= 1) { return arr; } for(let i="arr.length" - 1;>= 0; i--) {
        const switchIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[switchIndex]] = [arr[switchIndex], arr[i]]
    }

    return arr
}


let r= 0
for(let i = 0; i < 100000; i++) {
    random([1,2,3,4])[0] === 3 && r++
}

console.log(r)</=>