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

exports.paginate = async (query, options, next, previous) => {
    try {
        const result = await fileModel.paginate({
            query,
            next,
            previous,
            limit: options.limit
        })
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}