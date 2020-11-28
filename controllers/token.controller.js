"use strict";
const e = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "sdesign_prj";

exports.newToken = async (user) => {
  const payLoad = {
    accountName: user.accountName,
    accountId: user._id + 1,
    accountEmail: user.accountEmail,
  };
  return jwt.sign(payLoad, SECRET_KEY, {
    expiresIn: "24h",
  });
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log(token);
    const result = await jwt.verify(token, SECRET_KEY);
    if (!result) return false;
    req.accountEmail = result.accountEmail;
    req.accountId = result.accountId.slice(0, -1);
    req.accountName = result.accountName;
    return next();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
