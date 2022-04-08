const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

const { User, Post } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{
        model: User,
        as: "Followers",
        attributes: [ "id", "name" ],
      }, {
        model: User,
        as: "Followings",
        attributes: [ "id", "name" ],
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
}