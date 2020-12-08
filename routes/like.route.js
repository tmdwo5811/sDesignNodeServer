"use strict";

const tokenController = require("../controllers/token.controller");
const likeController = require("../controllers/like.controller");
module.exports = (router) => {
  router
    .route("/set/like")
    .post(
      tokenController.verifyToken,
      likeController.setLike
    );
  router
    .route("/get/my/like/sounds")
    .get(
      tokenController.verifyToken,
      likeController.getMyLikedSounds
    );

  return router;
};
