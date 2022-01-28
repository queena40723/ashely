// /stock-be/routes/stock.js
// 這裏 stock 的 router
const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock");

// RESTful API 的列表
router.get("/", stockController.getAll);

router.get("/:stockId", stockController.getPriceByCode);

module.exports = router;
