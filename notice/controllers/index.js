const { User, Post } = require("../models");

exports.index = async (req, res) => {
  res.render("index");
};

exports.join = async (req, res) => {
  res.render("join");
};

exports.profile = async (req, res) => {
  res.render("profile", {
    user: req.user,
  });
};

exports.notice = async (req, res) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: [ "id", "name" ],
      order: [[ "createdAt", "DESC" ]],
    },
  });
  res.render("notice", {
    posts,
    user: req.user,
  });
};

exports.write = (req, res) => {
  res.render("write");
};