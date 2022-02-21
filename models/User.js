const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space를 없애주는 역할
    unique: 1, //같은 값은 하나만 존재할 수 있다.
  },
  password: {
    type: String,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, //정해지지 않는 다면 0
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const saltRounds = 10; // 암호화에 사용되는 Salt로 값이 높을수록 암호화 연산이 증가. 하지만 암호화 하는데 속도가 느려진다.

userSchema.methods.encryptPassword = function (cb) {
  let user = this;

  bcrypt.genSalt(saltRounds, function (error, salt) {
    if (error) return cb(error);

    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      cb();
    });
  });
};
userSchema.methods.comparePassword = function (plainpassword, cb) {
  bcrypt.compare(plainpassword, this.password, function (error, isMatch) {
    if (error) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), process.env.SECRET_TOKEN);
  user.token = token;
  user.save(function (error, user) {
    if (error) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  //토큰을 사용해서 유저를 찾음
  let user = this;
  jwt.verify(token, process.env.SECRET_TOKEN, function (error, decoded) {
    if (error) return cb(error);
    user.findOne({ _id: decoded, token: token }, function (error, user) {
      if (error) return cb(error);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
