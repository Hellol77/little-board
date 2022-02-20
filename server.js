const express = require("express");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const User = require("./routes/User");
const { userInfo } = require("os");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
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
  .then(() => console.log("MongoDB Connected..."))
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

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api", (req, res) => {
  res.json({ 안녕: "hellol" });
});
