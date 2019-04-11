const Project = require('../models/ProjectModel');
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
const Community = require('../models/CommunityModel');
const Notification = require('../models/NotificationModel');
const _ = require('lodash');

function pluralize(baseWord, count, alt=false) {
  if (alt === false) {
    return ((count > 1) || (count === 0)) ? baseWord + "s" : baseWord;
  }

  else {
    return ((count > 1) || (count === 0)) ? baseWord.slice(0, -1) + "ies" : baseWord;
  }

};

function combineExtensions(ext1, ext2) {
  let output = "";

  if ((ext1 !== "") && (ext2 !== "")) {
    output = ext1 + " and " + ext2;
  }

  else if ((ext1 !== "") && (ext2 === "")) {
    output = ext1
  }

  else if ((ext1 === "") && (ext2 !== "")) {
    output = ext2;
  }

  return output;
};

function readablePostNotification(contentObject) {
  let { communityName, commentCount, reactionCount, postId, notifIds } = contentObject;

  let title = `Your post in #${communityName} is getting attention!`;
  let commentExt = "";
  let reactionExt = "";

  if (commentCount > 0) {
    commentExt = `${commentCount} new ` + pluralize("comment", commentCount);
  }

  if (reactionCount > 0) {
    reactionExt = `${reactionCount} new ` + pluralize("reaction", reactionCount);
  }

  return {
    title,
    message: combineExtensions(commentExt, reactionExt),
    postId,
    notifIds,
    communityName
  };
};

function readableCommentNotification(contentObject) {

  let { communityName, replyCount, upvoteCount, commentId, postId, notifIds } = contentObject;

  let title = `New interactions on your comment in #${communityName}!`
  let replyExt = "";
  let upvoteExt = "";

  if (replyCount > 0) {
    replyExt = `${replyCount} new ` + pluralize("reply", replyCount, true);
  }

  if (upvoteCount > 0) {
    upvoteExt = `${upvoteCount} new ` + pluralize("upvote", upvoteCount);
  }

  return {
    title,
    message: combineExtensions(replyExt, upvoteExt),
    commentId,
    postId,
    notifIds,
    communityName,
  };
};

function readableSubscriptionNotification(contentObject) {
  let { projectName, subCount } = contentObject;

  let title = `@${projectName} has new subscriptions!`;
  let message = `${subCount} new ` + pluralize("subscriber", subCount);

  return { title, message, projectName };

}

module.exports = {
  async formalizeSubscriptionNotifs(subscriptionObject) {
    let subscriptionMessageArray = []; // holder for our subscription message objs
    let projectIdArray = []; // temporarily used for the query

    for (let projectId in subscriptionObject) {
      projectIdArray.push(projectId);
    }

    // search for matching projects
    let projects = await Project.find({ _id: { $in: projectIdArray }}, 'name');

    // for each project found, match it with the corresponding notification
    // and build the notification message
    for (let i in projects) {
      subscriptionMessageArray.push(
        readableSubscriptionNotification({
          projectName: projects[i].name,
          subCount: subscriptionObject[projects[i]._id].length
        })
      );
    }

    return subscriptionMessageArray;
  },

  async formalizePostInteractionNotifs(postObject) {
    let postMessageArray = []; // holder for our post interaction message objs
    let countObj = {}; // temporary holder for the counts of reactions and comments
    let postIdsForQuery = []; // need to store postIds for query

    for (let postId in postObject) {
      postIdsForQuery.push(postId);

      let notifIds = [];

      for (let i in postObject[postId]) {
        notifIds.push(postObject[postId][i]._id)
      }

      // sort the array by reactions and comments, so we can count easily
      let tempObj = _.groupBy(postObject[postId], (subObj) => subObj.type);

      // add to the CountObj if we have the event type
      countObj[postId] = {
        postId: postId,
        notifIds: notifIds,
        reactionCount: (tempObj['new-reaction'] !== undefined) ? tempObj['new-reaction'].length : 0,
        commentCount: (tempObj["new-comment"] !== undefined) ? tempObj['new-comment'].length : 0
      };
    }

    // find all posts matching the ids we have notifications for
    let postArray = await Post.find({ _id: { $in: postIdsForQuery }}, 'communityId');

    // sort the postArray by the CommunityIds, so we can make notifications cumalitve
    // returns an object
    let postArraySortedByCommunityId = _.groupBy(postArray, function(subObj) {
      return subObj.communityId
    });

    let communityIdsForQuery = [];
    for (let communityId in postArraySortedByCommunityId) {
      communityIdsForQuery.push(communityId);
    }

    // has communityNames and communityIds
    let communities = await Community.find({_id: { $in: communityIdsForQuery }}, 'name');

    // since our communities can contain multiple posts that we want to aggregate
    // we'll iterate through by communities, then build a notification for each
    // community
    for (let i in communities) {
      let communityName = communities[i].name;
      let communityId = communities[i].id;

      // get all ids associated with that community
      let postIds = postArraySortedByCommunityId[communityId];

      /*
      // if we have more than one, aggregate
      if (postIds.length > 1) {
        let reactionCount = 0;
        let commentCount = 0;

        postIds.forEach((x) => {
          reactionCount += countObj[x._id].reactionCount;
          commentCount += countObj[x._id].commentCount;
        })

        postMessageArray.push({
          title: `New comments and reactions to your posts in #${communityName}!`,
          message: `${commentCount} new comments and ${reactionCount} new reactions`
        });
      }

      // if we only have one post in that community
      else {
        postMessageArray.push({
          title: `New comments and reactions in #${communityName}!`,
          message: `${countObj[postIds[0]._id].commentCount} new comments and ${countObj[postIds[0]._id].reactionCount} new reactions`
        });
      }*/

      postIds.forEach((x) => {
        postMessageArray.push(
          readablePostNotification({
            communityName,
            commentCount: countObj[x._id].commentCount,
            reactionCount: countObj[x._id].reactionCount,
            postId: countObj[x._id].postId,
            notifIds: countObj[x._id].notifIds
          })
        );
        /*
        postMessageArray.push({
          title: `New comments and reactions on your post in #${communityName}!`,
          message: `${countObj[x._id].commentCount} new comments and ${countObj[x._id].reactionCount} new reactions`
        });*/
      });
    }

    return postMessageArray;
  },

  async formalizeCommentInteractionNotifs(commentObject) {
    let commentMessageArray = [];
    let countObj = {};
    let commentIdsForQuery = [];

    for (let commentId in commentObject) {
      commentIdsForQuery.push(commentId);
      let notifIds = [];

      let tempObj = _.groupBy(commentObject[commentId], (subObj) => subObj.type);

      for (let i in commentObject[commentId]) {
        notifIds.push(commentObject[commentId][i]._id)
      }

      countObj[commentId] = {
        commentId: commentId,
        notifIds: notifIds,
        upvoteCount: (tempObj['new-upvote'] !== undefined) ? tempObj['new-upvote'].length : 0,
        replyCount: (tempObj['new-reply'] !== undefined) ? tempObj['new-reply'].length : 0,
      }
    }

    let commentArray = await Comment.find({ _id: {$in: commentIdsForQuery}});

    //let postArray = await Post.find({ _id: { $in: postIdsForQuery }}, 'communityId');
    let commentArraySortedByPostId = _.groupBy(commentArray, function(subObj) {
      return subObj.postId
    });

    let postIdsForQuery = commentArray.map((x) => x.postId);
    let postArray = await Post.find({ _id: { $in: postIdsForQuery }}, 'communityId');

    let postArraySortedByCommunityId = _.groupBy(postArray, function(subObj) {
      return subObj.communityId;
    });


    // build array from sorted communityIds we found from querying the posts
    let communityIdsForQuery = [];
    for (let communityId in postArraySortedByCommunityId) {
      communityIdsForQuery.push(communityId);
    }

    let communities = await Community.find({_id: { $in: communityIdsForQuery }}, 'name');

    // since we include community names in notifs, start there
    for (let i in communities) {
      let communityName = communities[i].name;
      let communityId = communities[i].id;

      // get every post associated with that community
      let postIds = postArraySortedByCommunityId[communityId];

      // cycle through those posts, get the associated comment ids
      for (let i in postIds) {
        let postId = postIds[i]._id;

        let commentIds = commentArraySortedByPostId[postId];

        // build a notif for each commentId
        commentIds.forEach((x) => {
          commentMessageArray.push(readableCommentNotification({
            communityName,
            replyCount: countObj[x._id].replyCount,
            upvoteCount: countObj[x._id].upvoteCount,
            commentId: countObj[x._id].commentId,
            postId: postId,
            notifIds: countObj[x._id].notifIds,
          }));
          /*
          commentMessageArray.push({
            title: `New replies and upvotes on your comment on a post in #${communityName}!`,
            message: `${countObj[x._id].replyCount} new replies and ${countObj[x._id].upvoteCount} new upvotes`
          });*/
        });
      }
    }

    return commentMessageArray;
  },

  async createNotification(type="", notifObject) {
    /* Notif Obj
      needs one of each row:
        WHO IS THIS FOR: ownerProfileId, or ownerProjectId,
        WHO IS THIS FROM: sendingProfileId, sendingProjectId, sendingCommunityId,
        WHAT IS THIS ABOUT: postId, commentId
    */
    const {
      ownerProfileId,
      ownerProjectId,
      sendingProfileId,
      commentId,
      postId,
    } = notifObject

    switch (type) {
      case 'new-subscriber':
        // should have ownerProjectId, sendingProfileId, NA
        await Notification.create({ type, ownerProjectId, sendingProfileId });

        break;

      case 'new-reaction': // emoji reaction to a post
        // should have (ownerProjectId OR ownerProfileId), postId, sendingProfileId
        await Notification.create({ type, ownerProjectId, ownerProfileId, sendingProfileId, postId });

        break;

      case 'new-comment': // new comment in direct reply to a post
        await Notification.create({ type, ownerProjectId, ownerProfileId, sendingProfileId, postId });
        break;

      case 'new-reply': // new reply to a comment of yours
        let notif = await Notification.create({ type, ownerProfileId, sendingProfileId, commentId });
        break;

      case 'new-upvote': // new upvote on one of your comments
        //let { ownerProfileId, sendingProfileId, commentId } = notifObject;
        await Notification.create({ type, ownerProfileId, sendingProfileId, commentId });

        break;

      default: break;
    }
  },

  /*readablePostNotification(contentObject) {

  },*/


}
