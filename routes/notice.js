const express = require("express");
const multer = require("multer");
const { noticeImage, noticeDetail, noticeWrite, noticeSearch, uploadImage, uploadNone } = require("../controllers/notice");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/write", isLoggedIn, uploadNone.none(), noticeWrite);
router.post("/image", isLoggedIn, uploadImage.single("image"), noticeImage);
router.get("/detail/:id", isLoggedIn, noticeDetail);
router.get("/search/:kind/:value", isLoggedIn, noticeSearch);

module.exports = router;