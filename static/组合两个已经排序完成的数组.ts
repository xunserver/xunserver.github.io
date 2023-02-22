/**
 * 将两个排序好的数组组合成心已经排序的数组
 */

function mergerSort(arr1: [string], arr2: [string]): [string] {
    var i = arr1.length - 1, j = arr2.length - 1;
    for (var k = i + j + 1; k >= 0; k--) {
        if (i === -1) {
            arr1[k] = arr2[j];
            continue;
        }
        if (j === -1) {
            return arr1;
        }
        if (arr1[i] > arr2[j]) {
            arr1[k] = arr1[i];
            i--
        } else {
            arr1[k] = arr2[j];
            j--
        }
    }
    return arr1;
} 