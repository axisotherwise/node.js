const { User } = require("../models");

exports.userFollowing = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      return res.status(201).send("success");
    } else {
      return res.status(404).send("no user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.userUnFollowing = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      return res.status(200).send("success");
    } else {
      return res.status(404).send("no user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};