let car = require("./car");

console.log(car.color);
car.color = "blue";
console.log(car.color);
car.setName("AAAA");
car.showName();

// 模組來源：
// 1. 內建的: fs
// require("fs")
// 2. 第三方: mysql2, moment, axios, dotenv,...
// require("mysql2")
// 3. 自己開發的*
