// /controllers/stock
const stockModel = require("../models/stock");

let getAll = async (req, res, next) => {
  let data = await stockModel.getAll();
  // res.send ==> 純文字
  // res.render ==> server-side render 會去找樣板
  res.json(data);
};

let getPriceByCode = async (req, res, next) => {
  // req.params.stockId
  // req.query.page <- 第幾頁
  // /api/stock/:stockId?page=

  // 取得目前在第幾頁
  // 如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  console.log("aaaaaaaaa", page);

  // 取得目前的總筆數
  let total = await stockModel.countByCode(req.params.stockId);

  // 計算總共應該要有幾頁
  const perPage = 3;
  // lastPage: 總共有幾頁
  const lastPage = Math.ceil(total / perPage);

  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;
  // 取得資料
  let data = await stockModel.getPriceByCode(
    req.params.stockId,
    perPage,
    offset
  );

  // 準備要 response
  res.json({
    pagination: { total, perPage, page, lastPage },
    data,
  });
};

module.exports = {
  getAll,
  getPriceByCode,
};
