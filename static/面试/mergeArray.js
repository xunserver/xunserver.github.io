function merge(arr1, arr2) {
    let i = 0; j = 0;
    if(!arr1.length) {
        return arr2;
    }
    if(!arr2.length) {
        return arr1;
    }

    const result = [];
    while(i < arr1.length || j < arr2.length) {
        let flag = true;
        if(arr1[i] < arr2[j] || j >=arr2.length) {
            result.push(arr1[i]);
        } else if(arr1[i] >= arr2[j] || i >=arr1.length) {
            result.push(arr2[j]);
            flag = false
        }

        if(flag) {
            i++;
        } else {
            j++;
        }
    }

    return result

}

function mergeSort(arr) {
    let result = [];
    let i = 0;
    while(i < arr.length) {
        result = merge(result, arr[i]);
        i++
    }

    return result
}

console.log(mergeSort([[1,2,3,4], [1,2,3,5,6,7,8,11], [99], [1]]))