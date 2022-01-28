// /models/stock
const connection = require("../utils/db");

// 取得全部資料
async function getAll() {
  let [data, fields] = await connection.execute("SELECT * FROM stocks");
  console.log(data);
  return data;
}

// 取得某個股票代碼的總筆數
async function countByCode(stockId) {
  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?",
    [stockId]
  );
  return total[0].total;
}

async function getPriceByCode(stockId, perPage, offset) {
  let [data] = await connection.execute(
    "SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?",
    [stockId, perPage, offset]
  );
  return data;
}

module.exports = {
  getAll,
  countByCode,
  getPriceByCode,
};
