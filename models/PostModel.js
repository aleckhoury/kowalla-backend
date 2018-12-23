const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  },
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'community'
  },
  content: String, // TODO: figure out how to store tiptaps
  views: Number,
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
