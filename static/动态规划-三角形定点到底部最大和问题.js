function maxSum(data) {
    var result = [data[0][0]];
    for(var i = 1 ; i < data.length; i++) {
        var current = [];
        for(var j = 0; j < data[i].length; j++) {
            current.push(data[i][j] + Math.max(result[j] >>> 0, result[j-1] >>> 0))
        }
        result = current
    }
 
    return Math.max.apply(null, result)
}

var testData = [
    [1],
    [1,2],
    [1,2,3],
    [1,23,4,5]
]

console.time("start")

console.log(maxSum(testData))
console.timeEnd("start")


