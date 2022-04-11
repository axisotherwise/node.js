const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: "/auth/kakao/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({ where: { snsId: profile.id }});
      if (exUser) { // 기존 유저
        done(null, exUser);
      } else { // 회원가입
        const user = await User.create({
          email: profile._json.kakao_account.email,
          name: profile.username,
          snsId: profile.id,
          provider: profile.provider,
        });
        done(null, user);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};