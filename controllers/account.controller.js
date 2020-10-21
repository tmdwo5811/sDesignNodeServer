'use strict';
const accountService = require('../services/account.service');

exports.createAccount = async (req, res, next) => {
    try {
        const {accountEmail, accountPw, accountName} = req.body;
        const result = await accountService.createAccount(accountEmail, accountPw, accountName);
        return res.send(result);
    } catch (e) {
        console.log(e);
        next(e);
    }
}