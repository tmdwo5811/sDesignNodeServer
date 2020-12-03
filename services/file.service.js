"use struct";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const fileRepository = require("../repositories/file.repository");
const ObjectId = require("mongoose").Types.ObjectId;
const accountRepository = require("../repositories/account.repository");
const removeEmpty = (resultData) => {
  let result = [];
  for (let i = 0; i < resultData.length; i++) {
    let obj = Object.assign({}, resultData[i]._doc);
    let tags = [];
    if (obj.tags && obj.tags.length > 0) {
      for (let x = 0; x < obj.tags.length; x++) {
        tags.push(obj.tags[x].replace(/(\s*)/g, ""));
      }
    }
    obj.tags = tags;
    result.push(obj);
  }
  return result;
};
exports.createFileInfo = async (accountId, filename, filePath, soundName, tags, category) => {
  try {
    const query = { accountId: accountId, fileName: filename, filePath, soundName, created: Date.now(), tags, category };
    const result = await fileRepository.create(query);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.getSoundList = async (next, previous) => {
  try {
    const query = {};
    const paginated = await fileRepository.paginate(query, { limit: 15 }, next, previous);
    const ids = paginated.results.map((s) => s._id);
    const populate = { path: "accountId", model: "account", select: "accountName accountEmail accountImg" };
    const options = { sort: { _id: -1 } };
    const resultData = await fileRepository.findAll({ _id: ids }, {}, populate, options);
    const result = removeEmpty(resultData);
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

exports.getMySoundList = async (accountId, next, previous) => {
  try {
    const query = { accountId: ObjectId(accountId) };
    const paginated = await fileRepository.paginate(query, { limit: 15 }, next, previous);
    const ids = paginated.results.map((s) => s._id);
    const populate = { path: "accountId", model: "account", select: "accountName accountEmail accountImg" };
    const options = { sort: { _id: -1 } };
    const resultData = await fileRepository.findAll({ _id: ids }, {}, populate, options);
    const result = removeEmpty(resultData);
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

exports.removeMySound = async (accountId, soundId) => {
  try {
    const query = { accountId, _id: soundId };
    const fileInfo = await fileRepository.findOne(query, {});
    const filePath = path.join(__dirname, "js200", "../../files/uploads/" + fileInfo.fileName);
    let isRemoved = false;
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) return { isRemoved };

      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        } else {
          isRemoved = true;
        }
      });
    });

    const result = await fileRepository.removeOne(query);
    return {
      result,
      isRemoved,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.resizeImg = async (fileName) => {
  try {
    const localPath = path.join(__dirname, "js200", "../../files/profile/" + fileName);
    const destination = path.join(__dirname, "js200", "../../files/profile/thumbnail_" + fileName);
    const result = await sharp(localPath).resize(100, 100).jpeg({ quality: 50 }).toFile(destination);
    fs.unlinkSync(localPath);
    if (result) return "thumbnail_" + fileName;
    return result.err;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.removeProfileImg = async (accountId) => {
  try {
    const accountInfo = await accountRepository.findOne({ _id: accountId });
    if (!accountInfo.accountImg) return null;
    const imgName = accountInfo.accountImg.split("/");
    const imgPath = path.join(__dirname, "js200", "../../files/profile/" + imgName[imgName.length - 1]);

    let isRemoved = false;
    fs.access(imgPath, fs.constants.F_OK, (err) => {
      if (err) return { isRemoved };

      fs.unlink(imgPath, (err) => {
        if (err) {
          return err;
        } else {
          isRemoved = true;
        }
      });
    });
    return isRemoved;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.searchSound = async (keyword, next, previous) => {
  try {
    const query = { $text: { $search: keyword } };
    const paginated = await fileRepository.paginate(query, { limit: 15 }, next, previous);
    const ids = paginated.results.map((s) => s._id);
    const populate = { path: "accountId", model: "account", select: "-password" };
    const resultData = await fileRepository.findAll({ _id: { $in: ids } }, {}, populate, { sort: { _id: -1 } });
    const result = removeEmpty(resultData);
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
