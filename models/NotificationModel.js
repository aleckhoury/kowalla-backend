const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const NotificationSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  ownerProfileId: String, // who is receiving the notification
  ownerProjectId: String, // who is receiving the notification
  sendingProfileId: String, // where is the notification coming from? a person interacting
  sendingProjectId: String, // where is the notification coming from? a project you like
  sendingCommunityId: String, // where is the notification coming from? for modding
  postId: String,
  commentId: String,
  content: String,
  type: String,  // subscription notification / interaction / friend did a timed post, etc -> eventually expand into enumerated value
  viewed: Boolean
},
{
  timestamps: true
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
