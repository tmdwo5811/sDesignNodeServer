"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const db = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());
app.set("views", __dirname + "/utils");
app.use(express.static("files"));
app.engine("html", require("ejs").renderFile);
require("./routes")(app);
const docs = require("./routes/swagger.route");
const mongoUrl = `mongodb+srv://nodeapi:nC7ZznzhonIg15hd@sDesign.8etgi.mongodb.net/sdesign?retryWrites=true&w=majority`;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// https 적용 해야함
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to sDesign mongod Server.");
});
mongoose.connect(mongoUrl, mongoOptions);

const server = http.createServer(app);
const port = 2500;
server.listen(port, () => {
  console.log(`sDesign NODE SERVER - RUNNING ON ${port}`);
});
