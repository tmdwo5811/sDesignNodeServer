'use struct'
const { replaceOne } = require('../models/file.model');
const fileRepository = require('../repositories/file.repository');

exports.createFileInfo = async (accountId, filename, filePath, soundName, soundTag) => {
    try {
        const query = {accountId: accountId.slice(0, -1), fileName: filename, filePath, soundName, created: Date.now(), soundTag};
        const result = await fileRepository.create(query);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.getSoundList = async ( next, previous ) => {
    try {
        const query = {};
        const paginated = await fileRepository.paginate(query, {limit: 15}, next, previous);
        return paginated;
    } catch (e) {
        console.log(e);
        throw e;
    }
}