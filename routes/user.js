const express = require("express");

const { userFollowing, userUnFollowing } = require("../controllers/user");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/following/:id", isLoggedIn, userFollowing);
router.delete("/unfollowing/:id", isLoggedIn, userUnFollowing);


module.exports = router;