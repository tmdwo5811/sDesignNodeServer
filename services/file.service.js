'use struct'
const fileRepository = require('../repositories/file.repository');

exports.createFileInfo = async (accountId, filename, filePath, soundName) => {
    try {
        const query = {accountId, fileName: filename, filePath, soundName, created: new Date.now()};
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