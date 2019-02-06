const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const CommentSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  postId: String,
  updateId: String,
  commentId: String,
  content: String, // initially just a string, no tiptaps
  views: Number,
},
{
  timestamps: true
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
