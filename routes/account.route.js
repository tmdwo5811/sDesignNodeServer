"use strict";
const multer = require("multer");
const path = require("path");
const accountController = require("../controllers/account.controller");
const tokenController = require("../controllers/token.controller");

let rand;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./files/profile");
  },
  filename: (req, file, callback) => {
    rand =
      Date.now() +
      path.extname(file.originalname);
    callback(null, file.fieldname + "_" + rand);
  },
});
// 업로드 용량 제한 10MB
const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
});

module.exports = (router) => {
  router
    .route("/create/account")
    .post(accountController.createAccount);

  router
    .route("/confirm/account")
    .get(accountController.confirmAccount);

  router
    .route("/login")
    .post(accountController.accountLogin);

  router
    .route("/update/profile")
    .post(
      tokenController.verifyToken,
      upload.single("userImg"),
      accountController.updateProfile
    );

  router
    .route("/token/test")
    .get(
      tokenController.verifyToken,
      accountController.tokenTest
    );

  return router;
};
