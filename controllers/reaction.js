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
    const reactions = await Reaction.find({ postId });

    // Send
    reply.code(200).send(reactions);
  },

  async getReaction(request, reply) {
    // Init
    const { profileId, type, typeId } = request.params;

    // Act
    if (type === 'posts') {
      const reaction = await Reaction.findOne({ profileId, postId: typeId });

      // Send
      reply.code(200).send(reaction);
    } else if (type === 'updates') {
      const reaction = await Reaction.findOne({ profileId, updateId: postId });

      // Send
      reply.code(200).send(reaction);
    }
  },

  async createReaction(request, reply) {
    // Init
    const { profileId } = request.params;

    const { emoji, postId } = request.body;

    // Act
    const reaction = await Reaction.create({ profileId, postId, emoji });

    // Send
    await reaction.save();
    reply.code(201).send(reaction);

    // Build notification

    // get the owner of the post we're reacting to
    let post = await Post.findOne({ _id: postId }, 'profileId projectId');

    let notifObject = {
      sendingProfileId: profileId,
      postId: postId,
      ownerProfileId: post.profileId === undefined ? undefined : post.profileId,
      ownerProjectId: post.projectId === undefined ? undefined : post.projectId
    };
    await NotificationHelper.createNotification('new-reaction', notifObject);
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
