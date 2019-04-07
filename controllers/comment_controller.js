// Dependencies

// Models
const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');
const NotificationHelper = require('../helpers/notification_helpers');

module.exports = {
  async getPostCommentList(req, res, next) {
    // Init
    const { postId } = req.params;
    // Act
    const comments = await Comment.find({ postId, commentId: ''});

    // Send
    res.status(200).send(comments);
  },

  async getCommentReplyList(req, res, next) {
    // Init
    const { commentId, postId } = req.params;
    // Act
    const comments = await Comment.find({commentId, postId});

    // Send
    res.status(200).send(comments);
  },

  async getPostComment(req, res, next) {
    // Init
    const {
      postId,
      commentId
    } = req.params;

    // Act
    const comment = await Comment.findOne({postId, _id: commentId});

    // Send
    res.status(200).send(comment);
  },

  async createPostComment(req, res, next) {
    // Init
    const {
      profileId,
      postId,
      commentId,
      content,
    } = req.body;

    const views = 0;

    // Act
    const comment = await Comment.create({profileId, content, postId, commentId, views});
    console.log(comment);
    // Send
    await comment.save();
    res.status(201).send(comment);

    let post = await Post.findOne({_id: postId}, "profileId projectId");
    console.log(post)

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

  async deletePostComment(req, res, next) {
    // Init
    const { commentId } = req.params;

    // Act
    await Comment.findOneAndDelete({_id: commentId});
    const comment = await Comment.findOne({_id: commentId});

    // Send
    res.status(204).send(comment);
  },

  // ################################ Updates #################################
  async getUpdateCommentList(req, res, next) {
    // Init
    const { updateId } = req.params;

    // Act
    const comments = await Comment.find({updateId});

    // Send
    res.status(200).send({comments});
  },

  async getUpdateComment(req, res, next) {
    // Init
    const {
      updateId,
      commentId
    } = req.params;

    // Act
    const comment = await Comment.findOne({updateId, _id: commentId});

    // Send
    res.status(200).send(comment);
  },

  async createUpdateComment(req, res, next) {
    // Init
    const {
      profileId,
      commentId,
      content,
    } = req.body;

    const { updateId } = req.params;
    const views = 0;

    // Act
    const comment = await Comment.create({profileId, commentId, content, updateId, views});

    // Send
    await comment.save();
    res.status(201).send(comment);
  },

  async deleteUpdateComment(req, res, next) {
    // Init
    const { commentId } = req.params;

    // Act
    await Comment.findOneAndDelete({_id: commentId});
    const comment = await Comment.findOne({_id: commentId});

    // Send
    res.status(204).send(comment);
  },

}
