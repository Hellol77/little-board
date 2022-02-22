const express = require("express");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const User = require("./models/User");
const { userInfo } = require("os");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const http = require("http").createServer(app);
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false })); //application/x-www-form-urlencoded
app.use(bodyParser.json()); //application/json
app.use(cookieParser());

mongoose
  .connect(process.env.DB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    http.listen(process.env.PORT, function () {
      console.log("listening on 8080");
    });
  })
  .catch((err) => console.log(err));

// MongoClient.connect(process.env.DB_URL, function (error, client) {
//   if (error) return console.log(error);
//   const http = require("http").createServer(app);
//   http.listen(process.env.PORT, function () {
//     console.log("listening on 8080");
//   });
// });
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.encryptPassword((error) => {
    user.save((error, userInfo) => {
      if (error) return res.json({ success: false, error });

      return res.status(200).json({
        success: true,
      });
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //로그인 처리
  User.findOne({ email: req.body.email }, (error, user) => {
    //이메일이 데이터베이스에 있는지 확인
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일을 잘못 입력했습니다.",
      });
    }
    user.comparePassword(req.body.password, (error, isMatch) => {
      //이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호를 잘못 입력하셨습니다.",
        });
      }
      user.generateToken((error, user) => {
        if (error) return res.status(400).send(error);
        res //토큰을 쿠키에 저장
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
app.get("/api/users/auth", auth, function (req, res) {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, function (req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (error, user) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({ success: true });
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api", (req, res) => {
  res.json({ 안녕: "hellol" });
});
