/**
 * 找出一个数组最大和的字串
 * 
 * 动态规划方案,,,,, 牛逼的方案
 */

function LSS(list: [number]): number {
    var max = list[0];
    var startIndex = 0, endIndex = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i - 1] > 0) {
            list[i] += list[i - 1];
            endIndex = i;
        }
        max = Math.max(list[i], max)
    }
    return max;
}
