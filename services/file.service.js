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