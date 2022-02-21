const { User } = require("../models/User");

let auth = function (req, res, next) {
  //인증 처리
  let token = req.cookies.x_auth; //쿠키를 가져온다
  User.findByToken(token, function (error, user) {
    if (error) return console.log(error);
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
