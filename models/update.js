const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const UpdateSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    profileId: String,
    projectId: String,
    content: String, // TODO: figure out how to store tiptaps
    views: Number
  },
  {
    timestamps: true
  }
);

const Update = mongoose.model('update', UpdateSchema);

module.exports = Update;
