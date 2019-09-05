const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const SpaceSchema = new Schema({ // TODO: add username
  _id: { type: String, default: shortid.generate },
  isProject: { type: String, default: false },
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


SpaceSchema.virtual('subscribers', {
  ref: 'subscription',
  localField: '_id',
  foreignField: 'spaceId',
  count: true,
});

SpaceSchema.virtual('postCount', {
  ref: 'post',
  localField: '_id',
  foreignField: 'spaceId',
  count: true,
});

const Space = mongoose.model('space', SpaceSchema);

module.exports = Space;
