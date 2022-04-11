const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize"); 
const { User, Post } = require("../models");  

exports.uploadNone = multer();

exports.uploadImage = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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
    await Post.increment({
      view: 1,  
    }, {
      where: { id: req.params.id },
    });
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

exports.noticeSearch = async (req, res, next) => {
  const kind = decodeURIComponent(req.params.kind);
  const value = decodeURIComponent(req.params.value);
  if (kind === "제목") {
    const titlePost = await Post.findAll({
      where: {
        title: { [Op.like]: "%" + value + "%" },
      },
      include: {
        model: User,
        attributes: [ "id", "name" ],
      },
      order: [[ "createdAt", "DESC" ]],
    });
    return res.render("notice", {
      posts: titlePost,
      user: req.user,
      followingIdList: req.user.Followings.map(f => f.id),
    });
  }
  if (kind === "내용") {
    const contentPost = await Post.findAll({
      where: {
        content: { [Op.like]: "%" + value + "%" },
      },
      include: {
        model: User,
        attributes: [ "id", "name" ],
      },
      order: [[ "createdAt", "DESC" ]],
    });
    return res.render("notice", {
      posts: contentPost,
      user: req.user,
      followingIdList: req.user.Followings.map(f => f.id),
    });
  }
  if (kind === "작성자") {
    const userPost = await Post.findAll({
      include: {
        model: User,
        attributes: [ "id", "name" ],
        where: { name: { [Op.like]: "%" + value + "%" } },
      },
      order: [[ "createdAt", "DESC" ]],
    });
    return res.render("notice", {
      posts: userPost,
      user: req.user,
      followingIdList: req.user.Followings.map(f => f.id),
    });
  }
};
