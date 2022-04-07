const express = require("express");
const { authJoin, authLogin, authLogout, authKakao, authKakaoCallBack } = require("../controllers/auth");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/join", isNotLoggedIn, authJoin);
router.post("/login", isNotLoggedIn, authLogin);
router.get("/logout", isLoggedIn, authLogout);
router.get("/kakao", isNotLoggedIn, authKakao);
router.get("/kakao/callback", isNotLoggedIn, authKakaoCallBack);

module.exports = router;
