const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({ // TODO: add username
  name: String,
  description: String,
  headerPicture: String, // TODO: change to actual image storage
  admins: [String],
});

const Community = mongoose.model('community', CommunitySchema);

module.exports = Community;
