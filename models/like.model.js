const mongoose = require("mongoose");
const MongoPaging = require("mongo-cursor-pagination");

const likeSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
    },
    soundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file",
    },
    created: {
      type: Number,
    },
    updated: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

likeSchema.index({ targetSoundId: 1 });
likeSchema.index({ accountId: 1 });
likeSchema.index({ updated: -1 });
likeSchema.index({ created: -1 });
likeSchema.plugin(MongoPaging.mongoosePlugin);

mongoose.set("useCreateIndex", true);
const LikeModel = mongoose.model("like", likeSchema, "like");
module.exports = LikeModel;
