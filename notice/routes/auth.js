const express = require("express");
const passport = require("passport");

const { authJoin, authLogin, authLogout, authKakao, authKakaoCallBack } = require("../controllers/auth");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/join", isNotLoggedIn, authJoin);
router.post("/login", isNotLoggedIn, authLogin);
router.get("/logout", isLoggedIn, authLogout);

module.exports = router;
