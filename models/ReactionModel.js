const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  emoji: String, // TODO: change to whatever value we need to sort by

});

const Reaction = mongoose.model('reaction', ReactionSchema);

module.exports = Reaction;
