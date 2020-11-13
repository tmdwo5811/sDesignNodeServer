
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../utils/api-spec.json');

module.exports = (router) => {
    router.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return router;
}