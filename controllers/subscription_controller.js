// Dependencies

// Models
const Subscription = require('../models/SubscriptionModel');
const Project = require('../models/ProjectModel');
const Space = require('../models/SpaceModel');
const Profile = require('../models/ProfileModel');
const Notification = require('../models/NotificationModel');
const NotificationHelper = require('../helpers/notification_helpers');

module.exports = {
  async getSubscriptionList(request, reply) {
    // Init
    const { profileId } = request.params;
    //const profileObj = await Profile.findOne({_id: profileId});

    //onsole.log(profileObj);
    // Act

    let owned = [];
    let subscriptions = [];

    const subscriptionsArray = await Subscription.find({profileId});


    for (let i=0; i < subscriptionsArray.length; i++) {

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
            numSubs: projectObj.subscribers,
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
            numSubs: spaceObj.subscribers,
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
      subscriptions,
    };

    // Send
    reply.code(200).send({subscriptions: profileItems});
  },

  async getSubscription(request, reply) {
    // Init
    const {
      profileId,
      type,
      typeId
    } = request.params;

    // Act
    if (type === 'spaces') {
      const subscription = await Subscription.findOne({profileId, spaceId: typeId});

      // Send
      reply.code(200).send(subscription);
    }

    else if (type === 'projects') {
      const subscription = await Subscription.findOne({profileId, projectId: typeId});

      // Send
      reply.code(200).send(subscription);
    }


  },

  async createSubscription(request, reply) {
    // Init
    const { // these need to be null'd if they're not being used
      profileId,
    } = request.params;

    const {
      projectId,
      spaceId,
    } = request.body;

    if (projectId === undefined) { // add Space Sub
      // Act
      const subscription = await Subscription.create({profileId, spaceId});

      // Send
      await subscription.save();
      reply.code(201).send(subscription);

      //await Space.findOneAndUpdate({_id: spaceId}, {$inc: { subscribers: 1}});
      // build the notification
      let notifObject = {
        sendingProfileId: profileId,
        ownerSpaceId: spaceId,
      };

      await NotificationHelper.createNotification("new-subscriber", notifObject);
    }

    else if (spaceId === undefined) { // add Project Sub
      // Act
      const subscription = await Subscription.create({profileId, projectId});

      // Send
      await subscription.save();
      reply.code(201).send(subscription);

      /*
      profileId: String,
      projectId: String,
      spaceId: String,
      */

      // build the notification
      let notifObject = {
        sendingProfileId: profileId,
        ownerProjectId: projectId,
      };

      await NotificationHelper.createNotification("new-subscriber", notifObject);

      // updates the amount of on the project
      //await Project.findOneAndUpdate({_id: projectId}, {$inc: {subscribers: 1}});
    }
  },

  async deleteSubscription(request, reply) {
    // Init
    const {
      profileId,
      type,
      typeId
    } = request.params;

    // Act
    if (type === 'spaces') {
      await Subscription.findOneAndDelete({profileId, spaceId: typeId});
      const subscription = await Subscription.findOne({profileId, spaceId: typeId});

      // Send
      reply.code(204).send(subscription);
    }

    else if (type === 'projects') {
      await Subscription.findOneAndDelete({profileId, projectId: typeId});
      const subscription = await Subscription.findOne({profileId, spaceId: typeId});

      // Send
      reply.code(204).send(subscription);
    }


  },
}
