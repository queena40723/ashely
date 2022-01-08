console.log("start");

setTimeout(function () {
  console.log("Timeout1");
  // 要花很久時間的事
  for (let i = 0; i < 100000; i++) {
    let result = 0;
    for (let j = 0; j < 100000; j++) {
      result += j;
    }
  }
}, 0);

setTimeout(function () {
  console.log("Timeout2");
}, 0);

console.log("end");
