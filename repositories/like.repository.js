"use strict";

const likeModel = require("../models/like.model");

exports.create = async (query) => {
  try {
    const result = await likeModel.create([query]);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.paginate = async (query, options, next, previous) => {
  try {
    const result = await likeModel.paginate({
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
  return likeModel.find(query, projection).populate(populate).sort(options.sort);
};

exports.findOne = async (query, projection) => {
  return likeModel.findOne(query, projection);
};

exports.removeOne = async (query) => {
  return likeModel.deleteOne(query);
};
