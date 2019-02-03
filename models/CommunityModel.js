const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const CommunitySchema = new Schema({ // TODO: add username
  _id: { type: String, default: shortid.generate },
  name: String,
  description: String,
  headerPicture: String, // TODO: change to actual image storage
  admins: [String],
},
{
  timestamps: true
});

const Community = mongoose.model('community', CommunitySchema);

module.exports = Community;
