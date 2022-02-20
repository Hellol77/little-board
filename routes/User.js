const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space를 없애주는 역할
    unique: 1,
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
    default: 0,
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
const User = mongoose.model("User", userSchema);
module.exports = { User };
