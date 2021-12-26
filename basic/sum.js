// sum.js
// coding style
// sum
// 程式的執行效率 big O
// 「時間上」、空間上

// 寫程式要考慮的地方很多
// 執行效率、可讀性、擴充性、維護性...

// 手上拿的是錘子，就會看全世界都是釘子

function sum(n) {
  // result = 1 + 2 + 3 + .... + n
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
    // another code
  }
  return result;

  // if n is 5, L11 會跑幾次？ 5
  // if n is 10, L11 會跑幾次？ 10
  // if n is 1000, L11 會跑幾次？ 1000
  // 執行的效率會隨著 n 成等比例增加 --> O(n) <-- O(2n) O(3n)
}

function sum1(n) {
  // 梯形公式解
  let result = ((1 + n) * n) / 2;
  return result;
  // n = 1 => L24 執行 1 次
  // n = 2 => L24 執行 1 次
  // n = 10000 => L24 執行 1 次
  // O(1) <== O(2), O(3),...
  // 執行的效率跟輸入值的大小沒有關係，執行的效能是一個「常數」
}

// console.log(sum(1), sum(1)); // 1
// console.log(sum(2), sum(2)); // 3
// console.log(sum(5), sum(5)); // 15
// console.log(sum(10), sum(10)); // 55

// 壓力測試
console.time("for");
for (let i = 1; i <= 10000; i++) {
  sum(100000); // O(n)
}
console.timeEnd("for");

console.time("formula");
for (let i = 1; i <= 10000; i++) {
  sum1(100000); // O(1)
}
console.timeEnd("formula");

/*
let result = 0
for(let i = 0; i < n; i++) {
  for(let j = 0; j < n; j++) {
    result += i*j;
  }
}
n = 1 ==> L25 會跑 1 次
n = 2 ==> L25 會跑 4 次
n = 3 ==> L25 會跑 9 次
n = 100 ==> L25 會跑 100x100 次
O(n^2)

let result = 0
for(let i = 0; i < n; i++) {
  for(let j = 0; j < n; j++) {
    for(let k = 0; k < n; k++) {
      result += i * j * k;
    }
  }
}
O(n^3)

*/

/*
O(1) > O(log n) > O(n) > O(nlog n) > O(n^2) > O(n^3)


*/
