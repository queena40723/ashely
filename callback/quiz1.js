// 沒有 await => 41235
// 有 await => 41523
async function test() {
  console.log(1);

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });

  console.log(3);
}

console.log(4);
test();
console.log(5);
