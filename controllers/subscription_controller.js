// Dependencies

// Models
const Subscription = require('../models/SubscriptionModel');

module.exports = {
  async getSubscriptionList(req, res, next) {
    // Init
    const { profileId } = req.params;

    // Act
    const subscriptions = await Subscription.find({profileId});

    // Send
    res.status(200).send({subscriptions});
  },

  async getSubscription(req, res, next) {
    // Init
    const {
      profileId,
      type,
      typeId
    } = req.params;

    // Act
    if (type === 'communities') {
      const subscription = await Subscription.findOne({profileId, communityId: typeId});
      
      // Send
      res.status(200).send(subscription);
    }

    else if (type === 'projects') {
      const subscription = await Subscription.findOne({profileId, projectId: typeId});

      // Send
      res.status(200).send(subscription);
    }


  },

  async createSubscription(req, res, next) {
    // Init
    const { // these need to be null'd if they're not being used
      profileId,
    } = req.params;

    const {
      projectId,
      communityId,
    } = req.body;

    if (projectId === undefined) { // add Community Sub
      // Act
      const subscription = await Subscription.create({profileId, communityId});

      // Send
      await subscription.save();
      res.status(201).send(subscription);
    }

    else if (communityId === undefined) { // add Project Sub
      // Act
      const subscription = await Subscription.create({profileId, projectId});

      // Send
      await subscription.save();
      res.status(201).send(subscription);
    }
  },

  async deleteSubscription(req, res, next) {
    // Init
    const {
      profileId,
      type,
      typeId
    } = req.params;

    // Act
    if (type === 'communities') {
      await Subscription.findOneAndDelete({profileId, communityId: typeId});
      const subscription = await Subscription.findOne({profileId, communityId: typeId});

      // Send
      res.status(204).send(subscription);
    }

    else if (type === 'projects') {
      await Subscription.findOneAndDelete({profileId, projectId: typeId});
      const subscription = await Subscription.findOne({profileId, communityId: typeId});

      // Send
      res.status(204).send(subscription);
    }


  },
}
