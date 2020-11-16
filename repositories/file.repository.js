'use strict'

const fileModel = require('../models/file.model');

exports.create = async (query) => {
    try {
        const result = await fileModel.create([query]);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}