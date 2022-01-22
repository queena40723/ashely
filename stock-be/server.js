// 引入 express
const { application } = require("express");
const express = require("express");
require("dotenv").config();

// 利用 express 這個 library 來建立一個 web app (express instance)
let app = express();

// express 是由 middleware 組成的
// request -> middleware 1 -> middleware 2 -> ... -> response
// 中間件順序很重要!! Express 會按照你程式碼的順序去決定 next 是誰
// 中間件裡一定要有 next 或是 res.xxx
// next: 往下一關走
// res.xxx 結束這次的旅程 (req-res cycle)

// 一般中間件
// app.use(function (request, response, next) {});
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來拜訪嚕 at ${current.toISOString()}`);
  next();
  // res.send("Hello Middleware");
});

app.use((req, res, next) => {
  console.log("這是一個沒有用的中間件");
  next();
});

// router middleware
// app.get("/", function(request, response, next) {});
app.get("/", (req, res, next) => {
  console.info("拜訪首頁");
  res.send("Hello Express");
});

app.get("/about", (req, res, next) => {
  console.info("這是關於我們");
  // res.send("我們是 MFEE22");
  next();
});

app.get("/about", (req, res, next) => {
  console.info("這是關於我們 B");
  res.send("我們是 MFEE22 - Plan B");
});

app.use((req, res, next) => {
  console.log("這是一個在首頁後面的的中間件");
  next();
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
