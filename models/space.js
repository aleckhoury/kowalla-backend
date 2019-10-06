const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const SpaceSchema = new Schema(
  {
    // TODO: add username
    _id: { type: String, default: shortid.generate },
    isProject: { type: Boolean, default: false },
    name: { type: String, unique: true, required: true, uniqueCaseInsensitive: true },
    description: String,
    profilePicture: String, // TODO: this doesn't exist in our current designs
    headerPicture: String, // TODO: change to actual image storage
    admins: [String]
  },
  {
    toObject: { getters: true }, // these aren't working properly
    toJSON: { getters: true },
    timestamps: true
  }
);

SpaceSchema.virtual('subscribers', {
  ref: 'subscription',
  localField: '_id',
  foreignField: 'spaceId',
  count: true
});

SpaceSchema.virtual('postCount', {
  ref: 'post',
  localField: '_id',
  foreignField: 'spaceId',
  count: true
});

SpaceSchema.plugin(uniqueValidator, { message: 'This space name is already taken.' });

const Space = mongoose.model('space', SpaceSchema);

module.exports = Space;
