const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
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
});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

module.exports = Subscription;
