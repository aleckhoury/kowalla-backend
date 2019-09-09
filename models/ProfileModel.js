const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const ProfileSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  firstName: String,
  lastName: String,
  username: { type: String, unique: true, uniqueCaseInsensitive: true },
  description: String,
  profilePicture: String,
  reputation: { type: Number, default: 0 }, // need to implement update
  integrations: { type: Array, default: [] },
  githubToken: { type: String, default: '' },
  userId: { type: String, unique: true, required: true, uniqueCaseInsensitive: true },
},
{
  toObject: { getters: true },
  toJSON: { getters: true },
  timestamps: true
});

ProfileSchema.virtual('postCount', {
  ref: 'post',
  localField: '_id',
  foreignField: 'profileId',
  count: true,
});

ProfileSchema.virtual('commentCount', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'profileId',
  count: true,
});

/*
// woof get ready
ProfileSchema.virtual('reputation', {
  ref: 'reputation',
  localField: '_id',
  foreignField: 'profileId',
  justOne: true,
  count: false,

});*/

ProfileSchema.plugin(uniqueValidator, { message: 'This username is already taken.' });

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
