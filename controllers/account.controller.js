'use strict';
const accountService = require('../services/account.service');
const accountRepository = require('../repositories/account.repository');
const nodeMailer = require('nodemailer');
const tokenController = require('./token.controller');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sdesignsmtp@gmail.com',
        pass: 'sdesign1234'
    }
});

exports.createAccount = async (req, res, next) => {
    try {
        let {accountEmail, accountPw, accountName} = req.body;
        accountPw = await accountService.pwConvertToHash(accountPw.toString()); 
        const result = await accountService.createAccount(accountEmail, accountPw, accountName);
        if(result.code == 11000 || result.code == "11000") return res.send("3588")
        if(!result.code) {
            const mailOption = {
                from: '',
                to: accountEmail,
                subject: 'Welcome to SignUp sDesign',
                html:`<h1>sDesign 이메일 인증 부탁해요~!</h1><br><a href="http://limeprj.xyz:2500/api/confirm/account?hashValue=${result[0]._id+'1'}">이곳을 눌러 인증!</a>`
            }
            await transporter.sendMail(mailOption);
        }
        return res.send(result);
    } catch (e) {
        next(e);
    }
}

exports.confirmAccount = async (req, res, next) => {
    try {
        const {hashValue} = req.query;
        const accountId = hashValue.substring(0, hashValue.length -1);
        await accountService.confirmAccount(accountId);
        return res.redirect("https://www.naver.com");
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.accountLogin = async (req, res, next) => {
    try{
        const {accountEmail, accountPw} = req.body;
        const userInfo = await accountRepository.findOne({accountEmail, isAcceptEmail: true}, {created: false, updated: false, isAcceptEmail: false}, {lean: true});
        console.log(userInfo);
        const canLogin = await accountService.verifyPwhash(accountPw, userInfo.accountPw);
        console.log(canLogin);
        if(!canLogin) return res.send('5504');
        const token = await tokenController.newToken(userInfo);
        const result = {
            token, //token: token
            accountEmail: userInfo.accountEmail,
            accountName: userInfo.accountName,
            accountId: userInfo._id+1
        }
        return res.send(result);
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.tokenTest = async (req, res, next) => {
    try {
        const {accountEmail, accountId, accountName} = req;
        const data = {accountEmail, accountId, accountName};
        console.log(data);
        return res.send(data);
    } catch (e) {
        console.log(e);
        next(e);
    }
}