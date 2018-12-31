const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  profileId: { // of the commenter
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  postId: { // the parent post
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  commentId: { // add if replying to another comment
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
  content: String, // initially just a string, no tiptaps
  views: Number,
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
