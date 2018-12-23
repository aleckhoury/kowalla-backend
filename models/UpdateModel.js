const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  },
  content: String, // TODO: figure out how to store tiptaps
  views: Number,
});

const Update = mongoose.model('update', UpdateSchema);

module.exports = Update;
