/**
 * 输入股票价格数组
 * 输出在仅买卖一次的情况下的最大利润
 */

/**
 * 动态规划
 * i（i > 2） d[i] = 
 */
function bestBuyAndSell(prices: [number]): number {
    var min = prices[0];
    let i = 0;
    var profit = 0
    while (++i < prices.length) {
        if (prices[i] > prices[i - 1]) {
            profit = Math.max(profit, prices[i] - min)
        } else {
            min = Math.min(min, prices[i])
        }
    }
    return profit;
}