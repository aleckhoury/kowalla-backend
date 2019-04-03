const Notification = require('../models/NotificationModel');
const _ = require('lodash');

module.exports = {
  async getNotificationsList(req, res, next) {
    const { profileId } = req.params;
    // send owned projects and communities
    const { projectIdsArray } = req.body; // an array of string owned projects ids
    // CURRENT-STATE MVP SETUPS

    /*const notifications = await Notification.find({
      // we want
      // (unviewed notifications) AND ((notifications for a user) OR (notifications from a user's project))
      $and: [
        { viewed: false },
        { $or: [{ ownerProfileId: profileId }, { ownerProjectId: { $in: projectIdsArray }}] }
      ]
    });*/

    // for subscriptions

    let notificationQueue = {};

    let notifications = [
      // SUBSCRIBERS
      { type: "new-subscriber", ownerProjectId: "1"}, { type: "new-subscriber", ownerProjectId: "1"}, { type: "new-subscriber", ownerProjectId: "1"},
      { type: "new-subscriber", ownerProjectId: "2"}, { type: "new-subscriber", ownerProjectId: "2"},
      { type: "new-subscriber", ownerProjectId: "3"},

      // POST INTERACTIONS
      { type: "new-reaction", postId: "1"}, { type: "new-comment", postId: "1"}, { type: "new-reaction", postId: "1"},
      { type: "new-reaction", postId: "2"}, { type: "new-comment", postId: "2"},

      // COMMENT INTERACTIONS
      { type: "new-reply", commentId: "1"}, { type: "new-upvote", commentId: "1"}, { type: "new-reply", commentId: "1"},
      { type: "new-reply", commentId: "2"}, { type: "new-upvote", commentId: "2"},
    ];

    const sortedNotifications = _.groupBy(notifications, function(notif) {
      return notif.type;
    });

    for (let key in sortedNotifications) {
      switch (key) {
        case 'new-subscriber':
          // group the subscription notifications by which project is being subscribed to.
          let subscriptionNotifications = _.groupBy(sortedNotifications['new-subscriber'], function(subObj) {
            return subObj.ownerProjectId;
          })

          notificationQueue["subscriptions"] = subscriptionNotifications
          break; // end new-subscriber

        // when a case is empty or doesn't have a break, they'll default to the next one below it
        // https://stackoverflow.com/questions/16706716/using-two-values-for-one-switch-case-statement
        // so here, we're grouping reactions, comments and upvotes under the same thing, since we'll sort them by their post or comment ids

        // the next two cases are for interactions with posts
        // these will come as emoji reactions or comments directly on the post
        // NOTE, this DOES NOT include comments that reply direct to comments on your post
        case 'new-reaction':
        case 'new-comment':
          if (!notificationQueue.hasOwnProperty("posts")) {
            let tempPostArray = sortedNotifications['new-comment'].concat(sortedNotifications['new-reaction'])
            //console.log(tempPostArray)

            notificationQueue["posts"] = _.groupBy(tempPostArray, function(obj) {
              return obj.postId;
            });

            break; // end post-interactions
          }

          else { // we've already sorted post interactions
            break;
          }
        // end post-interactions

        // the next two cases are for interactions with comments
        // these will come as upvotes on the comment, or direct replies to it
        case 'new-reply':
        case 'new-upvote':
          //console.log(`${key}: ${!notificationQueue.hasOwnProperty("comments")}`)
          if (!notificationQueue.hasOwnProperty("comments")) { // if we DON'T have comments already
            let tempCommentArray = sortedNotifications['new-reply'].concat(sortedNotifications['new-upvote'])
            //console.log(tempCommentArray)

            notificationQueue["comments"] = _.groupBy(tempCommentArray, function(obj) {
              return obj.commentId;
            });

            //notificationQueue["comments"] = commentInteractions;

            break;
          }

          else { // we already have sorted comment interactions
            break;
          }
        // end comment-interactions

        default:
          break;
      }
    }

    console.log({notificationQueue});
    res.send({notifications: notificationQueue});
  },

  // NOT AN EXPRESS ROUTE, FOR USE IN OTHER CONTROLLERS TO MAKE NOTIFICATIONS
  async createNotification(type="", notifObject) {
    /* Notif Obj
      needs one of each row:
        WHO IS THIS FOR: ownerProfileId, or ownerProjectId,
        WHO IS THIS FROM: sendingProfileId, sendingProjectId, sendingCommunityId,
        WHAT IS THIS ABOUT: postId, commentId
    */
    switch (type) {
      case 'new-subscriber':
        console.log('new-subscriber');
        break;

      case 'new-reaction': // emoji reaction to a post
        console.log('new-reaction');
        break;

      case 'new-comment': // new comment in direct reply to a post
        console.log('new-comment');
        break;

      case 'new-reply': // new reply to a comment of yours
        console.log('new-comment');
        break;

      case 'new-upvote': // new upvote on one of your comments
        console.log('new-upvote');
        break;

      default: break;
    }
  }
}
