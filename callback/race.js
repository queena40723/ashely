let doWork = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`完成工作 ${job}`); // 會把這一個 promise 物件的狀態變成 fulfilled

      // 如果發生錯誤
      // reject(err)
      // 會把這一個 promise 物件的狀態變成 rejected
    }, timer);
  });
};

let p1 = doWork("刷牙", 2000);
let p2 = doWork("吃早餐", 1000);
let p3 = doWork("寫功課", 3000);

// 當三個中只要有一個做完，就會回覆
Promise.race([p1, p2, p3]).then((value) => {
  console.log(value);
});
