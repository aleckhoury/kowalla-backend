const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  profileId: String,
  postId: String,
  updateId: String,
  emoji: String, // TODO: change to whatever value we need to sort by

});

const Reaction = mongoose.model('reaction', ReactionSchema);

module.exports = Reaction;
