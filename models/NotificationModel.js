const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  profileId: { // required
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  projectId: { // add if relating to a project
    type: Schema.Types.ObjectId,
    ref: 'project'
  },
  communityId: { // add if relating to a community
    type: Schema.Types.ObjectId,
    ref: 'community'
  },
  content: String, // TODO: figure out how to store tiptaps
  viewed: Boolean
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
