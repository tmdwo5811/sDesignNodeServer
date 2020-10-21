'use strict';

const accountController = require('../controllers/account.controller');

module.exports = (router) => {
    router.route("/join")
    .post(accountController.createAccount);
    router.route("/login")
    .post(accountController.accountLogin);

    return router;
}