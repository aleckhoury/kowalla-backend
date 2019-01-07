const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpvoteSchema = new Schema({
  profileId: String,
  commentId: String,
});

const Upvote = mongoose.model('upvote', UpvoteSchema);

module.exports = Upvote;
