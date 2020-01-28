// Dependencies

// Models
const Subscription = require('../models/subscription');
const Project = require('../models/project');
const Space = require('../models/space');
const Profile = require('../models/profile');
const Notification = require('../models/notification');
const NotificationHelper = require('../helpers/notification');

module.exports = {
  async getSubscriptionList(request, reply) {
    // Init
    const { profileId } = request.params;
    //const profileObj = await Profile.findOne({_id: profileId});

    // Act

    let owned = [];
    let subscriptions = [];

    const subscriptionsArray = await Subscription.find({ profileId });

    for (let i = 0; i < subscriptionsArray.length; i++) {
      let sub = subscriptionsArray[i];

      if (sub['projectId'] !== undefined) {
        let projectObj = await Project.findOne({ _id: sub.projectId }).populate('subscribers');

        if (projectObj !== null) {
          let subObj = {
            profileId: sub.profileId,
            projectId: sub.projectId,
            name: projectObj.name,
            isProject: true,
            pictureUrl: projectObj.profilePicture,
            numSubs: projectObj.subscribers
          };

          // does profileId match admin of project?
          if (projectObj.admins.includes(profileId)) {
            owned.push(subObj);
          } else {
            subscriptions.push(subObj);
          }
        }
      } // end project if statement

      if (sub['spaceId'] !== undefined) {
        let spaceObj = await Space.findOne({ _id: sub.spaceId }).populate('subscribers');

        if (spaceObj !== null) {
          let subObj = {
            profileId: sub.profileId,
            spaceId: sub.spaceId,
            name: spaceObj.name,
            isProject: false,
            pictureUrl: spaceObj.profilePicture,
            numSubs: spaceObj.subscribers
          };

          if (spaceObj.admins.includes(profileId)) {
            owned.push(subObj);
          } else {
            subscriptions.push(subObj);
          }
        }
      } // end space if statement
    }

    let profileItems = {
      owned,
      subscriptions
    };

    // Send
    reply.code(200).send({ subscriptions: profileItems });
  },

  async getSubscription(request, reply) {
    // Init
    const { profileId, type, typeId } = request.params;

    // Act
    if (type === 'spaces') {
      const subscription = await Subscription.findOne({ profileId, spaceId: typeId });

      // Send
      reply.code(200).send(subscription);
    } else if (type === 'projects') {
      const subscription = await Subscription.findOne({ profileId, projectId: typeId });

      // Send
      reply.code(200).send(subscription);
    }
  },

  async getDefaultSubs(request, reply) {

    let kowalla = await Project.findOne({ _id: 'nLw0dX1O5' }).populate('subscribers');
    let all = await Space.findOne({ _id: 'fugmXEmwr' }).populate('subscribers');

    const subscription = [{
      _id: 'nLw0dX1O5',
      name: 'kowalla',
      isProject: true,
      pictureUrl: 'https://kowalla-dev.s3.amazonaws.com/project/profile-pics/1567970197968-icon.png',
      numSubs: kowalla.subscribers,
    },
    {
      _id: 'fugmXEmwr',
      name: 'all',
      isProject: false,
      pictureUrl: 'https://kowalla-dev.s3.us-east-2.amazonaws.com/space/profile-pics/1567689060098-icon.png',
      numSubs: all.subscribers,
    }];
      // Send
      reply.code(200).send(subscription);
  },

  async createSubscription(request, reply) {

    const { profileId } = request.params;
    const { projectId, spaceId } = request.body;

    if (projectId === undefined) {
      const subscription = await Subscription.create({ profileId, spaceId });
      await subscription.save();
      reply.code(201).send(subscription);

      const notificationData = {
        type: 'space-subscribe',
        senderProfileId: profileId,
        spaceId,
      };
      await NotificationHelper.createSubscribeNotification(notificationData);

    } else if (spaceId === undefined) {

      const subscription = await Subscription.create({ profileId, projectId });
      await subscription.save();
      reply.code(201).send(subscription);

      const notificationData = {
        type: 'project-subscribe',
        senderProfileId: profileId,
        projectId,
      };
      await NotificationHelper.createSubscribeNotification(notificationData);
    }
  },

  async deleteSubscription(request, reply) {
    // Init
    const { profileId, type, typeId } = request.params;

    // Act
    if (type === 'spaces') {
      await Subscription.findOneAndDelete({ profileId, spaceId: typeId });
      const subscription = await Subscription.findOne({ profileId, spaceId: typeId });

      // Send
      reply.code(204).send(subscription);
    } else if (type === 'projects') {
      await Subscription.findOneAndDelete({ profileId, projectId: typeId });
      const subscription = await Subscription.findOne({ profileId, spaceId: typeId });

      // Send
      reply.code(204).send(subscription);
    }
  }
};
