'use strict'
const accountRepository = require('../repositories/account.repository');


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