"use strict";

const fileModel = require("../models/file.model");

// prettier 테스트
exports.create = async (query) => {
  try {
    const result = await fileModel.create([query]);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.paginate = async (query, options, next, previous) => {
  try {
    const result = await fileModel.paginate({
      query,
      next,
      previous,
      limit: options.limit,
    });
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.findAll = async (query, projection, populate, options) => {
  return fileModel.find(query, projection).populate(populate).sort(options.sort);
};

exports.findOne = async (query, projection) => {
  return fileModel.findOne(query, projection);
};

exports.removeOne = async (query) => {
  return fileModel.deleteOne(query);
};

exports.countDocuments = async (query) => {
  return fileModel.countDocuments(query);
};
