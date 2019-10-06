// Dependencies

// Models
const Comment = require('../models/comment');
const Post = require('../models/post');
const NotificationHelper = require('../helpers/notification_helpers');

module.exports = {
  async getPostCommentList(request, reply) {
    // Init
    const { postId } = request.params;
    // Act
    const comments = await Comment.find({ postId, commentId: ''});

    // Send
    reply.code(200).send(comments);
  },

  async getCommentReplyList(request, reply) {
    // Init
    const { commentId, postId } = request.params;
    // Act
    const comments = await Comment.find({commentId, postId});

    // Send
    reply.code(200).send(comments);
  },

  async getPostComment(request, reply) {
    // Init
    const {
      postId,
      commentId
    } = request.params;

    // Act
    const comment = await Comment.findOne({postId, _id: commentId});

    // Send
    reply.code(200).send(comment);
  },

  async createPostComment(request, reply) {
    // Init
    const {
      profileId,
      postId,
      commentId,
      content,
    } = request.body;

    const views = 0;

    // Act
    const comment = await Comment.create({profileId, content, postId, commentId, views});
    // Send
    await comment.save();
    reply.code(201).send(comment);

    let post = await Post.findOne({_id: postId}, "profileId projectId");

    // build notification
    if (commentId === undefined) {
      // if no commentId, we're a high level post, which is a "new-comment" notif

      let notifObject = {
        sendingProfileId: profileId,
        postId: postId,
        ownerProfileId: (post.profileId === undefined) ? undefined : post.profileId,
        ownerProjectId: (post.projectId === undefined) ? undefined : post.projectId,
      };

      await NotificationHelper.createNotification("new-comment", notifObject)
    }

    else { // otherwise, it's a reply to a comment, which is a "new-reply" notif
      let notifObject = {
        sendingProfileId: profileId,
        commentId: commentId,
        ownerProfileId: (post.profileId === undefined) ? undefined : post.profileId,
      };

      await NotificationHelper.createNotification("new-reply", notifObject);
    }
  },

  async deletePostComment(request, reply) {
    // Init
    const { commentId } = request.params;

    // Act
    await Comment.findOneAndDelete({_id: commentId});
    const comment = await Comment.findOne({_id: commentId});

    // Send
    reply.code(204).send(comment);
  },

  // ################################ Updates #################################
  async getUpdateCommentList(request, reply) {
    // Init
    const { updateId } = request.params;

    // Act
    const comments = await Comment.find({updateId});

    // Send
    reply.code(200).send({comments});
  },

  async getUpdateComment(request, reply) {
    // Init
    const {
      updateId,
      commentId
    } = request.params;

    // Act
    const comment = await Comment.findOne({updateId, _id: commentId});

    // Send
    reply.code(200).send(comment);
  },

  async createUpdateComment(request, reply) {
    // Init
    const {
      profileId,
      commentId,
      content,
    } = request.body;

    const { updateId } = request.params;
    const views = 0;

    // Act
    const comment = await Comment.create({profileId, commentId, content, updateId, views});

    // Send
    await comment.save();
    reply.code(201).send(comment);
  },

  async deleteUpdateComment(request, reply) {
    // Init
    const { commentId } = request.params;

    // Act
    await Comment.findOneAndDelete({_id: commentId});
    const comment = await Comment.findOne({_id: commentId});

    // Send
    reply.code(204).send(comment);
  },

}
