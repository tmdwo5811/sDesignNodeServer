"use strict";
const accountService = require("../services/account.service");
const fileService = require("../services/file.service");
const accountRepository = require("../repositories/account.repository");
const nodeMailer = require("nodemailer");
const tokenController = require("./token.controller");
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "sdesignsmtp@gmail.com",
    pass: "sdesign1234",
  },
});

exports.createAccount = async (req, res, next) => {
  try {
    let { accountEmail, accountPw, accountName } = req.body;
    accountPw = await accountService.pwConvertToHash(accountPw.toString());
    const result = await accountService.createAccount(accountEmail, accountPw, accountName);
    if (result.code == 11000 || result.code == "11000") return res.send("3588");
    if (!result.code) {
      const mailOption = {
        from: "",
        to: accountEmail,
        subject: "Welcome to SignUp sDesign",
        html: `<h1>sDesign 이메일 인증 부탁해요~!</h1><br><a href="http://api.rubansbike.com:2500/api/confirm/account?hashValue=${
          result[0]._id + "1"
        }">이곳을 눌러 인증!</a>`,
      };
      await transporter.sendMail(mailOption);
    }
    return res.send(result);
  } catch (e) {
    next(e);
  }
};

exports.confirmAccount = async (req, res, next) => {
  try {
    const { hashValue } = req.query;
    const accountId = hashValue.substring(0, hashValue.length - 1);
    await accountService.confirmAccount(accountId);
    return res.redirect("https://www.jamong-prj.xyz");
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.accountLogin = async (req, res, next) => {
  try {
    const { accountEmail, accountPw } = req.body;
    const userInfo = await accountRepository.findOne(
      { accountEmail, isAcceptEmail: true },
      { created: false, updated: false, isAcceptEmail: false },
      { lean: true }
    );
    const canLogin = await accountService.verifyPwhash(accountPw, userInfo.accountPw);

    if (!canLogin) return res.send("5504");
    const token = await tokenController.newToken(userInfo);
    const result = {
      token, //token: token
      accountEmail: userInfo.accountEmail,
      accountName: userInfo.accountName,
      accountId: userInfo._id + 1,
    };
    return res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { accountId } = req;
    const { accountName } = req.body;
    let filePath = null;
    if (!accountName && !req.file) return res.send("7777");
    if (req.file) {
      filePath = req.file.filename == undefined ? false : `http://api.rubansbike.com:2500/api/get/img/${req.file.filename}`;
      if (filePath) {
        await fileService.removeProfileImg(accountId);
        const thumbnailName = await fileService.resizeImg(req.file.filename);
        filePath = "http://api.rubansbike.com:2500/api/get/img/" + thumbnailName;
      }
    }
    const filter = { _id: accountId };
    let doc = { accountName, accountImg: filePath };
    if (accountName && !filePath) doc = { accountName };
    if (!accountName && filePath) doc = { accountImg: filePath };
    const result = await accountRepository.updateOne(filter, doc, { new: true });

    return res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getProfileInfo = async (req, res, next) => {
  try {
    const { accountId } = req;
    const result = await accountRepository.findOne(
      { _id: accountId },
      { accountPw: false, isAcceptEmail: false, isExit: false, created: false, updated: false }
    );
    return res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.tokenTest = async (req, res, next) => {
  try {
    const { accountEmail, accountId, accountName } = req;
    const data = { accountEmail, accountId, accountName };
    console.log(data);
    return res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
