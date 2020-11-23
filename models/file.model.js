const mongoose = require('mongoose');
const MongoPaging = require('mongo-cursor-pagination');

const fileSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account'
        },
        created: {
            type: Number
        },
        fileName: {
            type: String
        },
        filePath: {
            type: String
        },
        soundName: {
            type: String
        }
    },{versionKey: false}
);



fileSchema.index({accountId: 1});
fileSchema.plugin(MongoPaging.mongoosePlugin);

mongoose.set('useCreateIndex', true);
const FileModel = mongoose.model('file', fileSchema, 'file');
module.exports = FileModel;