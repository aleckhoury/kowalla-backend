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

    function shuffleFisherYates(array, array2) {
      const final = array.concat(array2);
      let i = final.length;
      while (i--) {
        const ri = Math.floor(Math.random() * (i + 1));
        [final[i], final[ri]] = [final[ri], final[i]];
      }
      return final;
    }

    const skip = await Project.countDocuments();
    const skip2 = await Space.countDocuments();

    let random = Math.floor(Math.random() * (skip-1));
    let random2 = Math.floor(Math.random() * (skip2-1));

    const result = await Project.find({}, 'isProject name projectName profilePicture subscribers').skip(random).limit(3).populate('subscribers').lean();
    const result2 = await Space.find({}, 'isProject name profilePicture subscribers').skip(random2).limit(3).populate('subscribers').lean();

    const final = shuffleFisherYates(result, result2);

      // Send
      reply.code(200).send(final);
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
