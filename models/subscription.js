const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const SubscriptionSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    profileId: String,
    projectId: String,
    spaceId: String
  },
  {
    timestamps: true
  }
);

const Subscription = mongoose.model('subscription', SubscriptionSchema);

module.exports = Subscription;
