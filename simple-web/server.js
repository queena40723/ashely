// nodejs 內建的模組，不用安裝
const http = require("http");
require("dotenv").config();

const server = http.createServer(function (request, response) {
  // TODO: 怎麼處理 request, 要負責回覆 response
  // status code
  // 1xx, 2xx, 3xx, 4xx, 5xx

  response.statusCode = 200;
  const path = request.url;
  console.log(path);

  switch (path) {
    case "/":
      response.end("Hello, Server EFG");
      break;
    case "/about":
      response.end("Hello, this is about");
      break;
    default:
      response.statusCode = 404;
      response.end();
  }
});

// 做預設值
let port = process.env.SERVER_PORT || 3000;
server.listen(port, () => {
  console.log(`我們的簡易版 server 已經啟動，在 port ${port} 上`);
});
