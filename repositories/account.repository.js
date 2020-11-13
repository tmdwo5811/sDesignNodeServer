'use strict'

const accountModel = require('../models/account.model');

exports.create = async (query) => {
    try {
        const result = await accountModel.create([query]);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.updateOne = async (filter, doc, options) => {
    try {
        const result = await accountModel.updateOne(filter, doc, options);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.findOne = async (query, projection, options) => {
    try {
        const result = await accountModel.findOne(query, projection).lean(options.lean);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}