const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: "/auth/kakao/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
      const exUser = await User.findOne({ where: { snsId: profile.id }});
      if (exUser) {
        done(null, exUser);
      } else {
        const user = await User.create({
          
        })
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }))
}