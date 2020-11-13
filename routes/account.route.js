'use strict';

const accountController = require('../controllers/account.controller');
const tokenController = require('../controllers/token.controller');
module.exports = (router) => {
    router.route("/create/account")
    .post(accountController.createAccount);

    router.route("/confirm/account")
    .get(accountController.confirmAccount);

    router.route("/login")
    .post(accountController.accountLogin);

    router.route("/token/test")
    .get(
        tokenController.verifyToken,
        accountController.tokenTest
        )
    return router;
}