const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: String,
  username: String,
  description: String,
  profilePicture: String, // TODO: update to have image upload
  uiColor: String, // string #XXXXXX
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
