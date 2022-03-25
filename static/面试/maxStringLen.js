// 字符串出现不重复的最大长度
function maxLen(str) {
    const cache = new Map;
    let result = 0;

    let i = 0;
    let j = 0;
    while(i < str.len) {
        if(cache.has(str[i])) {
            result = Math.max(result, i - cache.get(str[i]))
        } else {

        }
    }
}