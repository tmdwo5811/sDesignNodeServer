'use strict'
const accountModel = require('../models/account.model');

exports.create = async (query) => {
    try {
        const result = accountModel.create([query]);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}