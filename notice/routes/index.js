const express = require("express");
const { index, join, profile } = require("../controllers");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", index);
router.get("/join", isNotLoggedIn, join);
router.get("/profile", isLoggedIn, profile);

module.exports = router;

