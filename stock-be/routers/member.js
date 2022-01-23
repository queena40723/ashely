const express = require("express");
const router = express.Router();

// "/api/member"

// "/api/member/info"
router.get("/info", (req, res, next) => {
  res.json({
    id: 1,
    name: "小賴",
  });
});

module.exports = router;
