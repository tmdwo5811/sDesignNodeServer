const mongoose = require("mongoose");
const MongoPaging = require("mongo-cursor-pagination");

const fileSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
    },
    created: {
      type: Number,
    },
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    soundName: {
      type: String,
    },
    tags: {
      type: Array,
    },
    category: {
      type: String,
    },
    likeCount: {
      type: Number,
    },
    isLiked: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

fileSchema.index({ likeCount: -1 });
fileSchema.index({ accountId: 1 });
fileSchema.index({ soundName: "text", tags: "text", category: "text" });
fileSchema.plugin(MongoPaging.mongoosePlugin);

mongoose.set("useCreateIndex", true);
const FileModel = mongoose.model("file", fileSchema, "file");
module.exports = FileModel;
