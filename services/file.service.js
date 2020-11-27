'use struct';
const fs = require("fs");
const path = require('path');

const fileRepository = require('../repositories/file.repository');

exports.createFileInfo = async (accountId, filename, filePath, soundName, tags, category) => {
    try {
        const query = {accountId: accountId.slice(0, -1), fileName: filename, filePath, soundName, created: Date.now(), tags, category};
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
        const ids = paginated.results.map(s => s._id);
        const populate = {path: 'accountId', model: "account", select: "accountName accountEmail"};
        const options = {sort: {_id: -1}};
        const result = await fileRepository.findAll({_id: ids}, {}, populate, options);
        return {
            result,
            paginator: {
                previous: paginated.previous,
                hasPrevious: paginated.hasPrevious,
                next: paginated.next,
                hasNext: paginated.hasNext
            }
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}


exports.getMySoundList = async ( accountId, next, previous ) => {
    try {
        const query = {accountId};
        const paginated = await fileRepository.paginate(query, {limit: 15}, next, previous);
        const ids = paginated.results.map(s => s._id);
        const populate = {path: 'accountId', model: "account", select: "accountName accountEmail"};
        const options = {sort: {_id: -1}};
        const result = await fileRepository.findAll({_id: ids}, {}, populate, options);
        return {
            result,
            paginator: {
                previous: paginated.previous,
                hasPrevious: paginated.hasPrevious,
                next: paginated.next,
                hasNext: paginated.hasNext
            }
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.removeMySound = async ( accountId, soundId) => {
    try {
        const query = {accountId, _id: soundId};
        const fileInfo = await fileRepository.findOne(query, {});
        const filePath = path.join(__dirname, 'js200', '../../files/uploads/'+fileInfo.fileName)
        let isRemoved = false;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) return {isRemoved};

            fs.unlink(filePath, (err) =>{
                if(err){
                    return err;
                } else {
                    isRemoved = true;
                }
            });
        });

        const result = await fileRepository.removeOne(query);
        return {
            result,
            isRemoved
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.searchSound = async (keyword, next, previous) => {
    try {
        const query = {$text: {$search: keyword}};
        const paginated = await fileRepository.paginate(query, {limit: 15}, next, previous);
        const ids = paginated.results.map(s => s._id);
        const populate = {path: 'accountId', model: 'account', select: '-password'};
        const result = await fileRepository.findAll({_id: {$in: ids}}, {}, populate,{sort: {_id: -1}});
        return {
            result,
            paginator: {
                previous: paginated.previous,
                hasPrevious: paginated.hasPrevious,
                next: paginated.next,
                hasNext: paginated.hasNext
            }
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}