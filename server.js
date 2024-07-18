const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
  res.send("Form data received successfully!");
});

app.listen(5000, function () {
  console.log("listening on 5000");
  console.log(__dirname);
});

MongoClient.connect("mongodb-connection-string", (err, client) => {});
