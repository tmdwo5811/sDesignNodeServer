"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();
const db = mongoose.connection;

try {
  const option = {
    ca: fs.readFileSync("/etc/letsencrypt/live/limeprj.xyz/fullchain.pem"),
    key: fs.readFileSync(path.resolve(process.cwd(), "/etc/letsencrypt/live/limeprj.xyz/privkey.pem"), "utf8").toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), "/etc/letsencrypt/live/limeprj.xyz/cert.pem"), "utf8").toString(),
  };

  https.createServer(option, app).listen(2501, () => {
    console.log(`[HTTPS] sDesign Server is started on port`);
  });
} catch (e) {
  console.log("[HTTPS] HTTPS 오류 발생. HTTPS 서버 실행 X");
  console.log(e);
}
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

process.on("SIGINT", () => {
  console.log("sDesign Server will Stop");
  server.close(() => {
    console.log("Server Closed");
    process.exit(0);
  });
});
