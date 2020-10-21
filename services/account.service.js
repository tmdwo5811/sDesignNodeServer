'use strict'
const accountRepository = require('../repositories/account.repository');

exports.pwConvertToHash = async (password) => {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf24ync(password, salt, 100000, 64, 'sha512').toString('hex');
        return [salt, hash].join('$');
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.verifyPwhash = async (password, original) => {
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];
    const hash = crypto.pbkdf2Sync(password, salt, 100000, , 'sha512').toString();
    return hash === originalHash;
}

exports.createAccount = async (accountEmail, accountPw, accountName) => {
    try {
        const query = {accountEmail, accountPw, accountName};
        const result = await accountRepository.create(query);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}