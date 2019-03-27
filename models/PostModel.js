const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  projectId: String,
  communityId: String,
  content: String,
  views: Number,
  duration: String,
  expiration: Date,
  isActive: Boolean,
  userCompleted: Boolean
},
{
  timestamps: true
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
