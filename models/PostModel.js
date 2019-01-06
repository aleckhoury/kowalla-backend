const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  profileId: String,
  projectId: String,
  communityId: String,
  content: String, // TODO: figure out how to store tiptaps
  views: Number,
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
