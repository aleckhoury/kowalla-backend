const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ProfileSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  firstName: String,
  lastName: String,
  username: String,
  description: String,
  profilePicture: String, // TODO: update to have image upload
  uiColor: String, // string #XXXXXX
},
{
  timestamps: true
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
