function main(money) {
  const coins = [100, 50, 10, 5, 1, 0.5, 0.1].map(item => item * 10);
  money *= 10;

  function pay(money, ways = [0, 0, 0, 0, 0], start = 0) {
    if (money === 0) {
      return ways;
    }
    for (var i = start; i < coins.length; i++) {
      if (coins[i] 