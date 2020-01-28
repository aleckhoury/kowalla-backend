const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const NotificationSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    profileId: String, // who is receiving the notification
    projectId: String, // who is receiving the notification
    spaceId: String, // where is the notification
    latestSenders: Array, // where is the notification coming from? a person interacting
    sendUserProfilePic: String,
    postId: String,
    commentId: String,
    count: Number,
    type: String, // subscription notification / interaction / friend did a timed post, etc -> eventually expand into enumerated value
    viewed: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
