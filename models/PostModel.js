const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  projectId: String,
  communityId: String,
  content: String, // TODO: figure out how to store tiptaps
  views: Number,
},
{
  timestamps: true
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
