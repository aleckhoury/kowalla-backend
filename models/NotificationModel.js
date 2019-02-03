const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const NotificationSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  profileId: String,
  projectId: String,
  communityId: String,
  content: String, // TODO: figure out how to store tiptaps
  viewed: Boolean
},
{
  timestamps: true
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
