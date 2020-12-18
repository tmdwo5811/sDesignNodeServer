const likeRepository = require("../repositories/like.repository");
const fileRepository = require("../repositories/file.repository");
const ObjectId = require("mongoose").Types.ObjectId;

const checkLikedSoundsV2 = async (soundList, accountId) => {
  console.log("start");
  const soundListIds = soundList.map((s) => s._id);
  const likeDatas = await likeRepository.findAllV2(
    { accountId: ObjectId(accountId), soundId: soundListIds, isDeleted: false },
    { soundId: true, _id: false }
  );
  const likeSoundIds = likeDatas.map((s) => s.soundId.toString());
  let result = soundList.map((s) => {
    s.isLiked = likeSoundIds.includes(s._id.toString());
    return s;
  });
  return result;
};

exports.setLike = async (accountId, soundId) => {
  try {
    const likeInfo = await likeRepository.findOne({ accountId, soundId }, { isDeleted: true });
    if (!likeInfo) {
      const query = { accountId, soundId, created: Date.now(), updated: Date.now(), isDeleted: false };
      const createResult = await likeRepository.create(query);
      return createResult;
    }
    const isDeleted = likeInfo.isDeleted == true ? false : true;
    const filter = { accountId, soundId };
    const doc = { accountId, soundId, updated: Date.now(), isDeleted };
    const result = await likeRepository.upsertOne(filter, doc);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.getMyLikedSounds = async (accountId, next, previous) => {
  try {
    const query = { accountId: ObjectId(accountId), isDeleted: false };
    const options = { sort: "updated", sortAscending: true, limit: 15 };
    const paginated = await likeRepository.paginate(query, options, next, previous);
    const ids = paginated.results.map((s) => s._id);
    const populate = { path: "soundId", model: "file", select: "" };
    const result = await likeRepository.findAll({ _id: { $in: ids } }, { isDeleted: false }, populate, { sort: { updated: -1 } });
    return {
      result,
      paginator: {
        previous: paginated.previous,
        hasPrevious: paginated.hasPrevious,
        next: paginated.next,
        hasNext: paginated.hasNext,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.getMyLikedSoundsV2 = async (accountId, next, previous) => {
  try {
    const likeDatas = await likeRepository.findAllV2({ accountId: ObjectId(accountId), isDeleted: false }, { soundId: true, _id: false });
    const likeIds = likeDatas.map((s) => s.soundId);
    const totalCount = await fileRepository.countDocuments({ _id: { $in: likeIds } });
    const query = { accountId: ObjectId(accountId), isDeleted: false };
    const options = { sort: "updated", sortAscending: true, limit: 15 };
    const paginated = await likeRepository.paginate(query, options, next, previous);
    const ids = paginated.results.map((s) => s.soundId);
    const populate = { path: "accountId", model: "account", select: "accountEmail accountName" };
    let result = await fileRepository.findAll({ _id: { $in: ids } }, {}, populate, { sort: { created: -1 }, limit: ids.length });
    return {
      totalCount,
      result: !accountId ? result : await checkLikedSoundsV2(result, accountId),
      paginator: {
        previous: paginated.previous,
        hasPrevious: paginated.hasPrevious,
        next: paginated.next,
        hasNext: paginated.hasNext,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.checkLikedSounds = async (soundList, accountId) => {
  const soundListIds = soundList.map((s) => s._id);
  const likeDatas = await likeRepository.findAllV2(
    { accountId: ObjectId(accountId), soundId: soundListIds, isDeleted: false },
    { soundId: true, _id: false }
  );
  const likeSoundIds = likeDatas.map((s) => s.soundId.toString());
  const result = soundList.map((s) => {
    s.isLiked = likeSoundIds.includes(s._id.toString());
    return s;
  });
  return result;
};
