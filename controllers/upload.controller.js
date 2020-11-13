'use strict';


exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) return res.send('파일을 업로드 해주세요.');
        console.log(req.file, "<== req.file");
        console.log(req.file.path, "<== req.file.path");
        return res.send('파일이 업로드 되었습니다.');
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