const Project = require('../models/project');
const Profile = require('../models/profile');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Space = require('../models/space');
const Notification = require('../models/notification');
const _ = require('lodash');

module.exports = {
  async createPostNotification(notificationData) {

    const { type, postId, profileId, projectId, senderProfileId } = notificationData;
    const expiration = new Date(Date.now() - 259200000).toISOString();
    let existing;
    const sender = await Profile.findOne({ _id: senderProfileId }, { profilePicture: 1, username: 1 }).lean();
    if (projectId) {
      existing = await Notification.findOne({ type, postId, projectId, createdAt: { $gte: expiration } }).lean();
    } else {
      existing = await Notification.findOne({ type, postId, profileId, createdAt: { $gte: expiration } }).lean();
    }
    // TODO 1-26-20 AK - Implement a "latestActivity" concept here to make these even more interesting
    if (existing !== null) {
      let count = existing.count;
      let latestSenders = [];
      if (existing.latestSenders[0] && sender.username !== existing.latestSenders[0]) {
        latestSenders = [ sender.username, existing.latestSenders[0] ];
      } else {
        latestSenders.push(sender.username);
      }
      if (sender.username !== existing.latestSenders[0]) {
        count = existing.count + 1;
      }
      const updateParams = {
        count,
        latestSenders,
        sendUserProfilePic: sender.profilePicture,
        viewed: false,
      };
      await Notification.findOneAndUpdate({ _id: existing._id }, updateParams);
    } else {
      const notification = {
        type,
        postId,
        profileId,
        projectId,
        count: 1,
        latestSenders: [sender.username],
        sendUserProfilePic: sender.profilePicture,
        viewed: false,
      };
      const newNotification = await Notification.create(notification);
      newNotification.save();

      return newNotification;
    }
  },

  async createSubscribeNotification(notificationData) {

    const { type, senderProfileId, spaceId, projectId } = notificationData;

    const expiration = new Date(Date.now() - 259200000).toISOString();
    let existing;
    const sender = await Profile.findOne({ _id: senderProfileId }, { profilePicture: 1, username: 1 }).lean();
    if (projectId) {
      existing = await Notification.findOne({ type, projectId, createdAt: { $gte: expiration } }).lean();
    } else {
      existing = await Notification.findOne({ type, spaceId, createdAt: { $gte: expiration } }).lean();
    }
    // TODO 1-26-20 AK - Implement a "latestActivity" concept here to make these even more interesting
    if (existing !== null) {
      let latestSenders = [];
      if (existing.latestSenders[0] && sender.username !== existing.latestSenders[0]) {
        latestSenders = [ sender.username, existing.latestSenders[0] ];
      } else {
        latestSenders.push(sender.username);
      }
      if (sender.username !== existing.latestSenders[0]) {
        const count = existing.count + 1;
      }
      const updateParams = {
        count,
        latestSenders,
        sendUserProfilePic: sender.profilePicture,
        viewed: false,
      };
      await Notification.findOneAndUpdate({ _id: existing._id }, updateParams);
    } else {
      const notification = {
        type,
        spaceId,
        projectId,
        count: 1,
        latestSenders: [sender.username],
        sendUserProfilePic: sender.profilePicture,
        viewed: false,
      };
      const newNotification = await Notification.create(notification);
      newNotification.save();

      return newNotification;
    }
  },

  async createCommentNotification(notificationData) {

    const { type, senderProfileId, profileId, commentId, postId } = notificationData;

    const expiration = new Date(Date.now() - 259200000).toISOString();
    let existing;
    const sender = await Profile.findOne({ _id: senderProfileId }, { profilePicture: 1, username: 1 }).lean();
      existing = await Notification.findOne({ type, profileId, createdAt: { $gte: expiration } }).lean();

    // TODO 1-26-20 AK - Implement a "latestActivity" concept here to make these even more interesting
    if (existing !== null) {
      let updateParams;
      if (sender.username !== existing.latestSenders[0]) {
        const count = existing.count + 1;
      }
      if (type === 'reply') {
        let latestSenders = [];
        if (existing.latestSenders[0] && sender.username !== existing.latestSenders[0]) {
          latestSenders = [ sender.username, existing.latestSenders[0] ];
        } else {
          latestSenders.push(sender.username);
        }
        updateParams = {
          count,
          latestSenders,
          sendUserProfilePic: sender.profilePicture,
          viewed: false,
        };
      } else {
        updateParams = {
          count,
          sendUserProfilePic: sender.profilePicture,
          viewed: false,
        };
      }
      await Notification.findOneAndUpdate({ _id: existing._id }, updateParams);
    } else {
      let notification;
      if (type === 'reply') {
        notification = {
          type,
          commentId,
          profileId,
          postId,
          count: 1,
          latestSenders: [sender.username],
          sendUserProfilePic: sender.profilePicture,
          viewed: false,
        };
      } else {
        notification = {
          type,
          commentId,
          profileId,
          postId,
          count: 1,
          sendUserProfilePic: sender.profilePicture,
          viewed: false,
        };
      }
      const newNotification = await Notification.create(notification);
      newNotification.save();

      return newNotification;
    }
  },
  async newCreationNotification(notificationData) {

    const { type, profileId, projectId, spaceId } = notificationData;
      const notification = {
        type,
        profileId,
        projectId,
        spaceId,
        sendUserProfilePic: 'https://kowalla-dev.s3.amazonaws.com/project/profile-pics/1567970197968-icon.png',
        viewed: false,
      };
      const newNotification = await Notification.create(notification);
      newNotification.save();

      return newNotification;
    },
};
