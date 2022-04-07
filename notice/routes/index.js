const express = require("express");
const { index, join, profile, notice, write } = require("../controllers");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", index);
router.get("/join", isNotLoggedIn, join);
router.get("/profile", isLoggedIn, profile);
router.get("/notice", isLoggedIn, notice);
router.get("/write", isLoggedIn, write);

module.exports = router;

