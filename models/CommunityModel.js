const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: String,
  description: String,
  headerPicture: String, // TODO: change to actual image storage
  admins: [{ // creator at index 0
    id: {
      type: Schema.Types.ObjectId,
      ref: 'profile'
    }
  }],
});

const Community = mongoose.model('community', CommunitySchema);

module.exports = Community;
