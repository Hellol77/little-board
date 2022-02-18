const express = require("express");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

MongoClient.connect(process.env.DB_URL, function (error, client) {
  if (error) return console.log(error);
  const http = require("http").createServer(app);
  http.listen(process.env.PORT, function () {
    console.log("listening on 8080");
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api", (req, res) => {
  res.json({ 안녕: "hellol" });
});
