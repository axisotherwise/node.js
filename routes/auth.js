const express = require("express");
const passport = require("passport");

const { authJoin, authLogin, authLogout, authKakao } = require("../controllers/auth");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/join", isNotLoggedIn, authJoin);
router.post("/login", isNotLoggedIn, authLogin);
router.get("/logout", isLoggedIn, authLogout);
router.get("/kakao", isNotLoggedIn, authKakao);
router.get("/kakao/callback", isNotLoggedIn, passport.authenticate("kakao", {
  failureRedirect: "/",
}), (req, res) => {
  res.redirect("/profile");
});

module.exports = router;
