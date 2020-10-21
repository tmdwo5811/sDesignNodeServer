'use strict'
const accountRepository = require('../repositories/account.repository');
const crypto = require('crypto');

exports.pwConvertToHash = async (password) => {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
        return [salt, hash].join('$');
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.verifyPwhash = async (password, original) => {
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === originalHash;
}

exports.createAccount = async (accountEmail, accountPw, accountName) => {
    try {
        const query = {
            accountEmail,
            accountPw,
            accountName,
            isAcceptEmail: false,
            isExit: false,
            created: Date.now(),
            updated: Date.now()
        };
        const result = await accountRepository.create(query);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.confirmAccount = async (accountId) => {
    try {
        const result = await accountRepository.updateOne({_id: accountId, isAcceptEmail: false}, {isAcceptEmail: true}, {upsert: false});
        return result;     
    } catch (e) {
        console.log(e);
        throw e;
    }
}
