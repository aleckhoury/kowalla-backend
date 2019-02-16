// Dependencies

// Models
const Reaction = require('../models/ReactionModel');

module.exports = {
  async getReactionList(req, res, next) {
    // Init
    const { postId } = req.params;

    // Act
    const reactions = await Reaction.find({postId});

    // Send
    res.status(200).send(reactions);
  },

  async getReaction(req, res, next) {
    // Init
    const {
      profileId,
      type,
      typeId,
    } = req.params;

    // Act
    if (type === 'posts') {
      const reaction = await Reaction.findOne({profileId, postId: typeId});

      // Send
      res.status(200).send(reaction);
    }

    else if (type === 'updates') {
      const reaction = await Reaction.findOne({profileId, updateId: postId});

      // Send
      res.status(200).send(reaction);
    }
  },

  async createReaction(req, res, next) {
    // Init
    const {
      profileId,
    } = req.params;

    const {
      emoji,
      postId
     } = req.body;

    // Act
    const reaction = await Reaction.create({profileId, postId, emoji});

    // Send
    await reaction.save();
    res.status(201).send(reaction);
  },

  async deleteReaction(req, res, next) {
    // Init
    const {
      profileId,
      postId,
    } = req.params;

    const {
      emoji
    } = req.body;

    // Act
    await Reaction.findOneAndDelete({profileId, postId, emoji});
    // const reaction = await Reaction.findOne({profileId, postId, emoji});

    // Send
    res.status(201).send('Successfully deleted reaction');
  },

}
