const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  profileId: String,
  postId: String,
  commentId: String,
  content: String, // initially just a string, no tiptaps
  views: Number,
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
