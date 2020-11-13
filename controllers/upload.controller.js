'use strict';

const path = require('path');

exports.uploadFile = async (req, res, next) => {
    try {
        const { accountEmail, accountName, accountId} = req;
        if (!req.file) return res.send('파일을 업로드 해주세요.');
        console.log(req.file, "<== req.file");
        console.log(req.file.path, "<== req.file.path");
        const filePath = `http://lime-prj.xyz:2500/api/get/file/${req.file.filename}`;
        return res.send({
            result: '파일이 업로드 되었습니다.',
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