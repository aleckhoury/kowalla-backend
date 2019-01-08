const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  profileId: String,
  projectId: String,
  content: String, // TODO: figure out how to store tiptaps
  views: Number,
});

const Update = mongoose.model('update', UpdateSchema);

module.exports = Update;
