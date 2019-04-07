const Notification = require('../models/NotificationModel');
const NotificationHelper = require('../helpers/notification_helpers');
const _ = require('lodash');

module.exports = {
  async getNotificationsList(req, res, next) {
    const { profileId } = req.params;
    // send owned projects and communities
    const { projectIdsArray } = req.body; // an array of string owned projects ids
    // CURRENT-STATE MVP SETUPS

    const notifications = await Notification.find({
      // we want
      // (unviewed notifications) AND ((notifications for a user) OR (notifications from a user's project))
      $and: [
        { viewed: false },
        { $or: [{ ownerProfileId: profileId }, { ownerProjectId: { $in: projectIdsArray }}] }
      ]
    });


    // for subscriptions

    let notificationQueue = {};
    let notifsArray = [];
    let commentInteractionsComplete = false;
    let postInteractionsComplete = false;
    /*
    let notifications = [ //0YYLqkssl
      // SUBSCRIBERS
      { type: "new-subscriber", ownerProjectId: "5ujOxFHEK"}, { type: "new-subscriber", ownerProjectId: "5ujOxFHEK"}, { type: "new-subscriber", ownerProjectId: "5ujOxFHEK"},
      { type: "new-subscriber", ownerProjectId: "U-_5qwjXV"}, { type: "new-subscriber", ownerProjectId: "U-_5qwjXV"},
      { type: "new-subscriber", ownerProjectId: "azDnNnf_5"},

      // POST INTERACTIONS
      { type: "new-reaction", postId: "0YYLqkssl"}, { type: "new-comment", postId: "0YYLqkssl"}, { type: "new-reaction", postId: "0YYLqkssl"},
      { type: "new-reaction", postId: "3LgzJA2yG"}, { type: "new-comment", postId: "3LgzJA2yG"},

      // COMMENT INTERACTIONS
      { type: "new-reply", commentId: "M_YXkcNQQ"}, { type: "new-upvote", commentId: "M_YXkcNQQ"}, { type: "new-reply", commentId: "M_YXkcNQQ"},
      { type: "new-reply", commentId: "a8nCBdPSE"}, { type: "new-upvote", commentId: "a8nCBdPSE"},
    ];*/

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

          //notificationQueue["subscriptions"] = subscriptionNotifications;

          let subNotifs = await NotificationHelper.formalizeSubscriptionNotifs(subscriptionNotifications);
          notifsArray = notifsArray.concat(subNotifs);

          break; // end new-subscriber

        // when a case is empty or doesn't have a break, they'll default to the next one below it
        // https://stackoverflow.com/questions/16706716/using-two-values-for-one-switch-case-statement
        // so here, we're grouping reactions, comments and upvotes under the same thing, since we'll sort them by their post or comment ids

        // the next two cases are for interactions with posts
        // these will come as emoji reactions or comments directly on the post
        // NOTE, this DOES NOT include comments that reply direct to comments on your post
        case 'new-reaction':
        case 'new-comment':
          if (!postInteractionsComplete) {
            postInteractionsComplete = true;

            let commentsDefined = sortedNotifications.hasOwnProperty('new-comment');
            let reactionsDefined = sortedNotifications.hasOwnProperty('new-reaction');
            let tempPostArray = [];

            if ((commentsDefined) && (reactionsDefined)) {
              tempPostArray = sortedNotifications['new-comment'].concat(sortedNotifications['new-reaction']);
            }

            else if ((commentsDefined) && (reactionsDefined === false)) {
              tempPostArray = sortedNotifications['new-comment'];
            }

            else if ((reactionsDefined) && (commentsDefined === false)) {
              tempPostArray = sortedNotifications['new-reaction'];
            }

            let postInteractionsObject = _.groupBy(tempPostArray, function(obj) {
              return obj.postId;
            });

            //console.log("\n\npostInteractionsObject")
            //console.log(postInteractionsObject)

            let postNotifs = await NotificationHelper.formalizePostInteractionNotifs(postInteractionsObject);
            notifsArray = notifsArray.concat(postNotifs);

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
          if (!commentInteractionsComplete) { // if we DON'T have comments already
            commentInteractionsComplete = true;
            let repliesDefined = sortedNotifications.hasOwnProperty('new-reply');
            let upvotesDefined = sortedNotifications.hasOwnProperty('new-upvote');

            let tempCommentArray = [];

            if ((repliesDefined) && (upvotesDefined)) {
              tempCommentArray = sortedNotifications['new-reply'].concat(sortedNotifications['new-upvote']);
            }

            else if ((repliesDefined) && (upvotesDefined === false)) {
              tempCommentArray = sortedNotifications['new-reply'];
            }

            else if ((upvotesDefined) && (repliesDefined === false)) {
              tempCommentArray = sortedNotifications['new-upvote'];
            }

            let commentInteractionsArray = _.groupBy(tempCommentArray, function(obj) {

              return obj.commentId;
            });

            let commentNotifs = await NotificationHelper.formalizeCommentInteractionNotifs(commentInteractionsArray)

            notifsArray = notifsArray.concat(commentNotifs)

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


    res.send({notifications: notifsArray});
  },
}
