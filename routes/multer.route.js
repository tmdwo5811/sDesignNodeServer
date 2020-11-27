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
const tokenController = require('../controllers/token.controller');
const fileController = require('../controllers/upload.controller');

module.exports = (router) => {
    router.route("/upload/file")
    .post(
        tokenController.verifyToken,
        upload.single('userFile'),
        fileController.uploadFile
    );
    router.route("/load/upload/page")
    .get(
        fileController.loadUploadPage
    )
    router.route("/get/file/:fileName")
    .get(
        fileController.getFile
    )
    router.route("/get/soundList")
    .get(
        fileController.getSoundList
    )
    router.route("/get/my/soundList")
    .get(
        tokenController.verifyToken,
        fileController.getSoundList
    )
    router.route("/remove/my/sound")
    .post(
        tokenController.verifyToken,
        fileController.removeMySound
    )
    router.route("/search/sound")
    .post(
        fileController.searchSound
    )

    return router;
}