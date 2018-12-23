const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpvoteSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
});

const Upvote = mongoose.model('upvote', UpvoteSchema);

module.exports = Upvote;
