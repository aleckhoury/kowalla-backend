const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  profileId: String,
  projectId: String,
  communityId: String,
});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

module.exports = Subscription;
