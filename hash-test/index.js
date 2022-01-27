const md5 = require("md5");
console.log("md5:", md5("test1234"));
console.log("md5:", md5("test1234"));

// bcrypt 跟 argon2 對同一字串每次 hash 後的結果都不同
// 不管 input 長度多少， output 長度都固定
const bcrypt = require("bcrypt");
(async () => {
  let result1 = await bcrypt.hash("test1234", 10);
  console.log("bcrypt 短:", result1);
  let result2 = await bcrypt.hash("test1234", 10);
  console.log("bcrypt 短:", result2);
  let result3 = await bcrypt.hash("test12345678MFEE221234", 10);
  console.log("bcrypt 長:", result3);
})();

const argon2 = require("argon2");
(async () => {
  let result1 = await argon2.hash("test1234", 10);
  console.log("argon2 短:", result1);
  let result2 = await argon2.hash("test1234", 10);
  console.log("argon2 短:", result2);
  let result3 = await argon2.hash("test12345678MFEE221234", 10);
  console.log("argon2: 長", result3);
})();
