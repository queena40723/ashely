const express = require("express");
const router = express.Router();
const { checkLogin } = require("../middlewares/auth");
// "/api/member"

// checkLogin 這個中間件會對這個 router 有效
router.use(checkLogin);

// "/api/member/info"
router.get("/", (req, res, next) => {
  // 因為有用了 checkLogin 這個我們自己寫的中間件
  // 能走到這裡，表示 req.session.member 一定有資料
  res.json(req.session.member);
});

module.exports = router;
