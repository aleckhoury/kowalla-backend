const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const CommentSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    profileId: String, // id of the poster
    postId: String,
    updateId: String,
    commentId: String,
    content: String,
    views: Number
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
