const mongoose = require("mongoose");
const MongoPaging = require("mongo-cursor-pagination");

const accountSchema = new mongoose.Schema(
  {
    accountEmail: {
      type: String,
      required: true,
      unique: true,
    },
    accountPw: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    isAcceptEmail: {
      type: Boolean,
    },
    isExit: {
      type: Boolean,
    },
    created: {
      type: Number,
    },
    updated: {
      type: Number,
    },
    accountImg: {
      type: String,
    },
  },
  { versionKey: false }
);

accountSchema.index({ accountEmail: 1 });
accountSchema.plugin(MongoPaging.mongoosePlugin);

mongoose.set("useCreateIndex", true);
const AccountModel = mongoose.model("account", accountSchema, "account");
module.exports = AccountModel;
