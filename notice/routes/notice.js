const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const { noticeWrite, noticeImage, noticeDetail } = require("../controllers/notice");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const uploadNone = multer();

router.post("/write", isLoggedIn, uploadNone.none(), noticeWrite);
router.post("/image", isLoggedIn, upload.single("image"), noticeImage);
router.get("/detail/:id", isLoggedIn, noticeDetail);

module.exports = router;

