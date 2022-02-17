const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);
http.listen(8080, function () {
  console.log("listening on 8080");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api", (req, res) => {
  res.json({ 안녕: "hellol" });
});
