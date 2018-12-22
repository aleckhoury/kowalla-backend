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

/*
Potentially set up separate collections for different post types

profileId of poster

projectId of host project

content

communityId of where it was posted

Array of emojis

postDuration
  For live posts and open metrics

Views
*/
