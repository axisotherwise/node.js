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
    },
    order: [[ "createdAt", "DESC" ]],
  });
  res.render("notice", {
    posts,
    user: req.user,
    followingIdList: req.user.Followings.map(f => f.id),
  });
};

exports.noticePage = async (req, res) => {
  let pageNum = req.params.page;
  let offset = 0;
  if (pageNum > 1) {
    offset = 7 * (pageNum - 1);
  }
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: [ "id", "name" ],
    },
    order: [[ "createdAt", "DESC" ]],
    offset: offset,
    limit: 3,
  });
  res.render("notice", {
    posts,
    user: req.user,
    followingIdList: req.user.Followings.map(f => f.id),
  })
}

exports.write = (req, res) => {
  res.render("write");
};