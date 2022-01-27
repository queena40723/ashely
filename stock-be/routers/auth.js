const express = require("express");
const router = express.Router();

// npm i express-validator
const { body, validationResult } = require("express-validator");
const registerRules = [
  // 檢查 email 是否符合格式
  body("email").isEmail().withMessage("Email 欄位請填寫正確格式"),
  body("password").isLength({ min: 8 }).withMessage("密碼長度至少為 8"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼驗證不一致"),
];
// /api/auth/register
router.post("/register", registerRules, (req, res, next) => {
  // req.params <-- 變數是在網址上
  // req.query  <-- ?xxx
  // body (form post)
  // console.log("req.body:", req.body);

  // 拿到驗證的結果
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    // validateResult 不是空的
    let error = validateResult.array();
    console.log("validateResult", error);
    return res.status(400).json({
      code: "33001",
      meg: error[0].msg,
    });
  }
  res.json({ message: "ok" });
});

module.exports = router;
