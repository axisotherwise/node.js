const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize"); 
const { User, Post } = require("../models");  
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

exports.uploadNone = multer();

exports.uploadImage = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "axisotherwise",
    key(req, file, done) {
      done(null, `original/${Date.now()}${path.basename(file.originalname)}`);
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
  console.log(req.file);
  const originalUrl = req.file.location;
  const url = originalUrl.replace(/\original\//, "/thumb/");
  res.json({ 
    url, 
    originalUrl: req.file.location 
  });
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
