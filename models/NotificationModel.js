const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  profileId: String,
  projectId: String,
  communityId: String,
  content: String, // TODO: figure out how to store tiptaps
  viewed: Boolean
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
