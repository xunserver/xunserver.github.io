function removeDuplicates(arr: [number]):  [number]{
    const len = arr.length;
    let fastIndex=0;
    let slowIndex=0;
    while(fastIndex < len) {
        if(arr[fastIndex]!==arr[slowIndex]) {
            slowIndex++;
            arr[slowIndex] = arr[fastIndex]
        }
        fastIndex++;
    }
    arr.splice(slowIndex+1)
    return arr
}

// 回顾splice 的用法 
/**
 * splice(0,1) 从0开始，删除一个元素， 不包含0
 * splice(0,1,1) 从0开始，删除一个元素， 不包含0，并在0后面添加元素1
 * splice(1),从index 1开始，删除index 1后面所有的元素
 */