const likeService = require("../services/like.service");

exports.setLike = async (req, res, next) => {
  try {
    const { accountId } = req;
    const { soundId } = req.body;
    const result = await likeService.setLike(accountId, soundId);
    return res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getMyLikedSounds = async (req, res, next) => {
  try {
    const { accountId } = req;
    const { next, previous } = req.query;
    const result = await likeService.getMyLikedSoundsV2(accountId, next, previous);
    return res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
