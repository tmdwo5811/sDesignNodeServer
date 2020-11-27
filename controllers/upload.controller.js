'use strict';

const path = require('path');
const fileService = require('../services/file.service');
exports.uploadFile = async (req, res, next) => {
    try {
        const { accountId } = req;
        const { soundName, tags, category } = req.body;
        if (!req.file) return res.send('파일을 업로드 해주세요.');
        const filePath = `http://limeprj.xyz:2500/api/get/file/${req.file.filename}`;
        const uploadStatus = await fileService.createFileInfo(accountId, req.file.filename, filePath, soundName, tags, category);

        return res.send({
            result: '파일이 업로드 되었습니다.',
            uploadStatus,
            filePath
        });
    } catch (e) {
        console.log(e); 
        next(e);
    }
}

exports.loadUploadPage = async (req, res, next) => {
    try {
        res.render('video.html')
    } catch (e) {
        console.log(e);
        next(e)
    }
}

exports.getFile = async (req, res, next) => {
    try {
        const { fileName } = req.params;
        const filePath = path.resolve(__dirname, "../files/uploads/" + fileName);
        return res.sendFile(filePath);
    } catch (e) {
        console.log(e);
        next(e)
    }
}

exports.getSoundList = async (req, res, next) => {
    try {
        const { next, previous } = req.query;
        const result = await fileService.getSoundList(next, previous);
        return res.send(result);
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.getMySoundList = async (req, res, next) => {
    try {
        const { accountId } = req;
        const { next, previous } = req.query;
        const result = await fileService.getMySoundList(accountId.slice(0, -1), next, previous);
        return res.send(result);
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.removeMySound = async (req, res, next) => {
    try {
        const { accountId } = req;
        const { soundId } = req.body;
        const result = await fileService.removeMySound(accountId.slice(0, -1), soundId);
        return res.send(result);
    } catch (e) {
        console.log(e);
        next(e);
    }
}

exports.searchSound = async (req, res, next) => {
    try {
        const {keyword, next, previous} = req.query;
        const result = await fileService.searchSound(keyword, next, previous);
        return res.send(result);
    } catch (e) {
        console.log(e);
        next(e);
    }
}