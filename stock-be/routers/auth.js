const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const bcrypt = require("bcrypt");
const path = require("path");
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

const multer = require("multer");
// 圖片要存哪裡？
const storage = multer.diskStorage({
  // 設定儲存的目的地(檔案夾)
  destination: function (req, file, cb) {
    // /public/uploads <-- 檔案夾要先建立好
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    console.log("multer-filename", file);
    const ext = file.originalname.split(".").pop();
    cb(null, `member-${Date.now()}.${ext}`);
  },
});

const uploader = multer({
  storage: storage,
  // 過濾圖片
  fileFilter: function (req, file, cb) {
    console.log("file.mimetype", file.mimetype);
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      cb(new Error("不接受的檔案型態"), false);
    } else {
      cb(null, true);
    }
  },
  // 檔案尺寸
  limits: {
    // 1K: 1024
    fileSize: 200 * 1024,
  },
});

// /api/auth/register
router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
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
        msg: error[0].msg,
      });
    }

    // 檢查 email 是不是已經註冊
    let [members] = await connection.execute(
      "SELECT * FROM members WHERE email=?",
      [req.body.email]
    );
    console.log(members);
    if (members.length > 0) {
      // 表示有查到這個 email
      // -> 註冊過了
      return res.status(400).send({
        code: "33002",
        msg: "這個 email 已經註冊過了",
      });
    }

    // 雜湊 password
    let hashPassword = await bcrypt.hash(req.body.password, 10);

    // 處理圖片
    console.log("req.file", req.file);
    let filename = req.file ? "/static/uploads/" + req.file.filename : "";
    console.log("filename", filename);
    // 儲存到資料庫
    let [result] = await connection.execute(
      "INSERT INTO members (email, password, name, photo) VALUES (?, ?, ?, ?)",
      [req.body.email, hashPassword, req.body.name, filename]
    );
    console.log(result);

    res.json({ message: "ok" });
  }
);

module.exports = router;
