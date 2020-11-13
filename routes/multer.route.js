'use strict';
const multer = require('multer');
const path = require('path');
let rand;
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './files/uploads')
    },
    filename: (req, file, callback) => {
        rand = Date.now() + path.extname(file.originalname);
        callback(null, file.fieldname + '_' + rand);
    }
});

const upload = multer({storage});
const uploadController = require('../controllers/upload.controller');

module.exports = (router) => {
    router.route("/upload/file")
    .post(
        upload.single('userFile'),
        uploadController.uploadFile
    );
    router.route("/load/upload/page")
    .get(
        uploadController.loadUploadPage
    )

    return router;
}