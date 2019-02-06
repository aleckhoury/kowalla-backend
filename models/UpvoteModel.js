const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const UpvoteSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  commentId: String,
},
{
  timestamps: true
});

const Upvote = mongoose.model('upvote', UpvoteSchema);

module.exports = Upvote;
