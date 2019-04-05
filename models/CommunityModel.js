const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const CommunitySchema = new Schema({ // TODO: add username
  _id: { type: String, default: shortid.generate },
  name: String,
  description: String,
  profilePicture: String, // TODO: this doesn't exist in our current designs
  headerPicture: String, // TODO: change to actual image storage
  admins: [String],
},
{
  toObject: { getters: true }, // these aren't working properly
  toJSON: { getters: true },
  timestamps: true
});


CommunitySchema.virtual('subscribers', {
  ref: 'subscription',
  localField: '_id',
  foreignField: 'communityId',
  count: true,
});

CommunitySchema.virtual('postCount', {
  ref: 'post',
  localField: '_id',
  foreignField: 'communityId',
  count: true,
});

const Community = mongoose.model('community', CommunitySchema);

module.exports = Community;
