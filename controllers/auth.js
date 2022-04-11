const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const sanitizeHtml = require("sanitize-html");

exports.authJoin = async (req, res, next) => {
  try {
    const exUser = await User.findOne({ where: { email }});
    if (exUser) return res.redirect("/?error=이미 가입된 회원입니다.");
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email: sanitizeHtml(req.body.email),
      name: sanitizeHtml(req.body.name),
      profile: sanitizeHtml(req.body.profile),
      password: hash,
    });
    res.status(201).redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.authLogin = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect("/?error=가입된 회원이 아닙니다.");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      return res.redirect("/profile");
    })
  })(req, res, next);
};

exports.authLogout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid").redirect("/");
  });
};

exports.authKakao = (req, res, next) => {
  passport.authenticate("kakao")(req, res, next);
};