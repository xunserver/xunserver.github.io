/**
 * 获取数组中满足小于m的最小长度
 */

 function getMiniLength(data, m) {
    if(data[0] > m) return 1;
    var min = data.length;
    var cache = [data[0]];
    for(var i = 1 ; i < data.length; i++) {
        if(data[i] > m) {
            return m
        }
        cache[i] = data[i];
        for(var j = cache.length - 2; j >= 0 ; j--) {
            if(data[i] + cache[j] >= m) {
                min = Math.min(i - j + 1, min) ;
            }
             cache[j] = data[i] + cache[j]
        }
    }
    return min;
 }

 console.log(getMiniLength([1,2,3,4,5], 9));
 