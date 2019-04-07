// Dependencies

// Models
const Subscription = require('../models/SubscriptionModel');
const Project = require('../models/ProjectModel');
const Community = require('../models/CommunityModel');
const Profile = require('../models/ProfileModel');
const Notification = require('../models/NotificationModel');
const NotificationHelper = require('../helpers/notification_helpers');

module.exports = {
  async getSubscriptionList(req, res, next) {
    // Init
    const { profileId } = req.params;
    console.log(profileId);
    //const profileObj = await Profile.findOne({_id: profileId});

    //onsole.log(profileObj);
    // Act

    let owned = [];
    let subscriptions = [];

    const subscriptionsArray = await Subscription.find({profileId});


    for (let i=0; i < subscriptionsArray.length; i++) {

      let sub = subscriptionsArray[i];


      if (sub['projectId'] !== undefined) {

        let projectObj = await Project.findOne({ _id: sub.projectId });


        if (projectObj !== null) {
          let subObj = {
            profileId: sub.profileId,
            projectId: sub.projectId,
            name: projectObj.name,
            pictureURL: projectObj.profilePicture,
            numSubs: Math.floor(Math.random() * Math.floor(1000)) // TODO: replace once we have that figured out
          };

          // does profileId match admin of project?
          //console.log(projectObj);
          if (projectObj.admins.includes(profileId)) {
            owned.push(subObj);
          } else {
            subscriptions.push(subObj);
          }
        }

      } // end project if statement

      if (sub['communityId'] !== undefined) {

        let communityObj = await Community.findOne({ _id: sub.communityId });

        if (communityObj !== null) {
          let subObj = {
            profileId: sub.profileId,
            communityId: sub.communityId,
            name: communityObj.name,
            pictureURL: communityObj.profilePicture,
            numSubs: Math.floor(Math.random() * Math.floor(1000)) // TODO: replace once we have that figured out
          };

          //console.log(communityObj);
          if (communityObj.admins.includes(profileId)) {
            owned.push(subObj);
          } else {
            subscriptions.push(subObj);
          }
        }
      } // end community if statement
    }

    let profileSubscriptions = {
      owned,
      subscriptions,
    };

    // Send
    res.status(200).send({profileSubscriptions});
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

      //await Community.findOneAndUpdate({_id: communityId}, {$inc: { subscribers: 1}});
      // build the notification
      let notifObject = {
        sendingProfileId: profileId,
        ownerCommunityId: communityId,
      };

      await NotificationHelper.createNotification("new-subscriber", notifObject);
    }

    else if (communityId === undefined) { // add Project Sub
      // Act
      const subscription = await Subscription.create({profileId, projectId});

      // Send
      await subscription.save();
      res.status(201).send(subscription);

      /*
      profileId: String,
      projectId: String,
      communityId: String,
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
