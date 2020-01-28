// Dependencies

// Models
const Reaction = require('../models/reaction');
const Post = require('../models/post');
const NotificationHelper = require('../helpers/notification');

module.exports = {
  async getReactionList(request, reply) {
    // Init
    const { postId } = request.params;

    // Act
    const reactions = await Reaction.find({ postId }, { emoji: 1, profileId: 1 }).lean();

    // Send
    reply.code(200).send(reactions);
  },

  async getReaction(request, reply) {
    // Init
    const { profileId, type, typeId } = request.params;

    // Act
    if (type === 'posts') {
      const reaction = await Reaction.findOne({ profileId, postId: typeId }).lean();

      // Send
      reply.code(200).send(reaction);
    } else if (type === 'updates') {
      const reaction = await Reaction.findOne({ profileId, updateId: postId }).lean();

      // Send
      reply.code(200).send(reaction);
    }
  },

  async createReaction(request, reply) {
    const { profileId } = request.params;
    const { emoji, postId } = request.body;

    const reaction = await Reaction.create({ profileId, postId, emoji });
    await reaction.save();
    reply.code(201).send(reaction);

    let post = await Post.findOne({ _id: postId }, 'profileId projectId').lean();

    if (profileId !== post.profileId) {
      let notificationData = {
        type: 'reaction',
        postId,
        profileId: post.profileId,
        projectId: post.projectId,
        senderProfileId: profileId,
      };

      await NotificationHelper.createPostNotification(notificationData);
    }
  },

  async deleteReaction(request, reply) {
    // Init
    const { profileId, postId } = request.params;

    const { emoji } = request.body;

    // Act
    await Reaction.findOneAndDelete({ profileId, postId, emoji });
    // const reaction = await Reaction.findOne({profileId, postId, emoji});

    // Send
    reply.code(201).send('Successfully deleted reaction');
  }
};
