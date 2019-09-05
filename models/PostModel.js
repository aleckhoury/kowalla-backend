const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const PostSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  projectId: String,
  spaceId: String,
  content: String,
  views: Number,
  duration: String,
  start: Date,
  end: Date,
  expiration: Date,
  isActive: Boolean,
  username: String,
  userCompleted: Boolean
},
{
  timestamps: true
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
