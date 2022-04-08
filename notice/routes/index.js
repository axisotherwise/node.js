const express = require("express");
const { index, join, profile, notice, noticePage, write } = require("../controllers");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", index);
router.get("/join", isNotLoggedIn, join);
router.get("/profile", isLoggedIn, profile);
router.get("/notice", isLoggedIn, notice);
router.get("/write", isLoggedIn, write);
router.get("/notice/:page", isLoggedIn, noticePage);

module.exports = router;

