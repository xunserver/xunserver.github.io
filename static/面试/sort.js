function quickSort(arr) {
    if(arr.length < 2) {
        return arr
    }
    const left = [];
    const right = [];

    arr.forEach(element => {
       if(element > arr[0]) {
            right.push(element)
       }
       if(element < arr[0]) {
            left.push(element)
       }
    });
    return [...quickSort(left), arr[0], ...quickSort(right)]
}

console.log(quickSort([0,0,0,2,12,2,0,5,3, 0,0,0,-1,-1]));
