const { User, Post } = require("../models");

exports.noticeWrite = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageurl,
      UserId: req.user.id,
    });
    return res.status(201).redirect("/notice");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.noticeImage = async (req, res, next) => {
  res.json({ url: `/img/${req.file.filename}`});
};

exports.noticeDetail = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: {
        model: User,
        attributes: [ "name" ],
      },
    });
    res.render("detail", {
      user: req.user,
      post,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

