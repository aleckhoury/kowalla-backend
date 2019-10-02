const Project = require('../models/project');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Space = require('../models/space');
const Notification = require('../models/notification');
const _ = require('lodash');

function checkForTomfoolery(ownerProfileId, sendingProfileId) {
  if (ownerProfileId === sendingProfileId) {
    return true;
  } else {
    return false;
  }
}

function pluralize(baseWord, count, alt = false) {
  if (alt === false) {
    return count > 1 || count === 0 ? baseWord + 's' : baseWord;
  } else {
    return count > 1 || count === 0 ? baseWord.slice(0, -1) + 'ies' : baseWord;
  }
}

function combineExtensions(ext1, ext2) {
  let output = '';

  if (ext1 !== '' && ext2 !== '') {
    output = ext1 + ' and ' + ext2;
  } else if (ext1 !== '' && ext2 === '') {
    output = ext1;
  } else if (ext1 === '' && ext2 !== '') {
    output = ext2;
  }

  return output;
}

function readablePostNotification(contentObject) {
  let { spaceName, commentCount, reactionCount, postId, notifIds } = contentObject;

  let title = `Your post in #${spaceName} is getting attention!`;
  let commentExt = '';
  let reactionExt = '';

  if (commentCount > 0) {
    commentExt = `${commentCount} new ` + pluralize('comment', commentCount);
  }

  if (reactionCount > 0) {
    reactionExt = `${reactionCount} new ` + pluralize('reaction', reactionCount);
  }

  return {
    title,
    message: combineExtensions(commentExt, reactionExt),
    postId,
    notifIds,
    spaceName
  };
}

function readableCommentNotification(contentObject) {
  let { spaceName, replyCount, upvoteCount, commentId, postId, notifIds } = contentObject;

  let title = `New interactions on your comment in #${spaceName}!`;
  let replyExt = '';
  let upvoteExt = '';

  if (replyCount > 0) {
    replyExt = `${replyCount} new ` + pluralize('reply', replyCount, true);
  }

  if (upvoteCount > 0) {
    upvoteExt = `${upvoteCount} new ` + pluralize('upvote', upvoteCount);
  }

  return {
    title,
    message: combineExtensions(replyExt, upvoteExt),
    commentId,
    postId,
    notifIds,
    spaceName
  };
}

function readableSubscriptionNotification(contentObject) {
  let { projectName, subCount, notifIds } = contentObject;

  let title = `@${projectName} has new subscriptions!`;
  let message = `${subCount} new ` + pluralize('subscriber', subCount);

  return { title, message, projectName, notifIds };
}

module.exports = {
  async formalizeSubscriptionNotifs(subscriptionObject) {
    let subscriptionMessageArray = []; // holder for our subscription message objs
    let projectIdArray = []; // temporarily used for the query
    let notifIdObject = {};

    for (let projectId in subscriptionObject) {
      projectIdArray.push(projectId);

      let tempNotifArray = [];
      for (let i in subscriptionObject[projectId]) {
        tempNotifArray.push(subscriptionObject[projectId][i]._id);
      }

      notifIdObject[projectId] = tempNotifArray;
    }

    // search for matching projects
    let projects = await Project.find({ _id: { $in: projectIdArray } }, 'name');

    // for each project found, match it with the corresponding notification
    // and build the notification message
    for (let i in projects) {
      subscriptionMessageArray.push(
        readableSubscriptionNotification({
          //notifId: subscriptionObject[]
          projectName: projects[i].name,
          subCount: subscriptionObject[projects[i]._id].length,
          notifIds: notifIdObject[projects[i]._id]
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
        notifIds.push(postObject[postId][i]._id);
      }

      // sort the array by reactions and comments, so we can count easily
      let tempObj = _.groupBy(postObject[postId], subObj => subObj.type);

      // add to the CountObj if we have the event type
      countObj[postId] = {
        postId: postId,
        notifIds: notifIds,
        reactionCount: tempObj['new-reaction'] !== undefined ? tempObj['new-reaction'].length : 0,
        commentCount: tempObj['new-comment'] !== undefined ? tempObj['new-comment'].length : 0
      };
    }

    // find all posts matching the ids we have notifications for
    let postArray = await Post.find({ _id: { $in: postIdsForQuery } }, 'spaceId');

    // sort the postArray by the SpaceIds, so we can make notifications cumalitve
    // returns an object
    let postArraySortedBySpaceId = _.groupBy(postArray, function(subObj) {
      return subObj.spaceId;
    });

    let spaceIdsForQuery = [];
    for (let spaceId in postArraySortedBySpaceId) {
      spaceIdsForQuery.push(spaceId);
    }

    // has spaceNames and spaceIds
    let spaces = await Space.find({ _id: { $in: spaceIdsForQuery } }, 'name');

    // since our spaces can contain multiple posts that we want to aggregate
    // we'll iterate through by spaces, then build a notification for each
    // space
    for (let i in spaces) {
      let spaceName = spaces[i].name;
      let spaceId = spaces[i].id;

      // get all ids associated with that space
      let postIds = postArraySortedBySpaceId[spaceId];

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
          title: `New comments and reactions to your posts in #${spaceName}!`,
          message: `${commentCount} new comments and ${reactionCount} new reactions`
        });
      }

      // if we only have one post in that space
      else {
        postMessageArray.push({
          title: `New comments and reactions in #${spaceName}!`,
          message: `${countObj[postIds[0]._id].commentCount} new comments and ${countObj[postIds[0]._id].reactionCount} new reactions`
        });
      }*/

      postIds.forEach(x => {
        postMessageArray.push(
          readablePostNotification({
            spaceName,
            commentCount: countObj[x._id].commentCount,
            reactionCount: countObj[x._id].reactionCount,
            postId: countObj[x._id].postId,
            notifIds: countObj[x._id].notifIds
          })
        );
        /*
        postMessageArray.push({
          title: `New comments and reactions on your post in #${spaceName}!`,
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

      let tempObj = _.groupBy(commentObject[commentId], subObj => subObj.type);

      for (let i in commentObject[commentId]) {
        notifIds.push(commentObject[commentId][i]._id);
      }

      countObj[commentId] = {
        commentId: commentId,
        notifIds: notifIds,
        upvoteCount: tempObj['new-upvote'] !== undefined ? tempObj['new-upvote'].length : 0,
        replyCount: tempObj['new-reply'] !== undefined ? tempObj['new-reply'].length : 0
      };
    }

    let commentArray = await Comment.find({ _id: { $in: commentIdsForQuery } });

    //let postArray = await Post.find({ _id: { $in: postIdsForQuery }}, 'spaceId');
    let commentArraySortedByPostId = _.groupBy(commentArray, function(subObj) {
      return subObj.postId;
    });

    let postIdsForQuery = commentArray.map(x => x.postId);
    let postArray = await Post.find({ _id: { $in: postIdsForQuery } }, 'spaceId');

    let postArraySortedBySpaceId = _.groupBy(postArray, function(subObj) {
      return subObj.spaceId;
    });

    // build array from sorted spaceIds we found from querying the posts
    let spaceIdsForQuery = [];
    for (let spaceId in postArraySortedBySpaceId) {
      spaceIdsForQuery.push(spaceId);
    }

    let spaces = await Space.find({ _id: { $in: spaceIdsForQuery } }, 'name');

    // since we include space names in notifs, start there
    for (let i in spaces) {
      let spaceName = spaces[i].name;
      let spaceId = spaces[i].id;

      // get every post associated with that space
      let postIds = postArraySortedBySpaceId[spaceId];

      // cycle through those posts, get the associated comment ids
      for (let i in postIds) {
        let postId = postIds[i]._id;

        let commentIds = commentArraySortedByPostId[postId];

        // build a notif for each commentId
        commentIds.forEach(x => {
          commentMessageArray.push(
            readableCommentNotification({
              spaceName,
              replyCount: countObj[x._id].replyCount,
              upvoteCount: countObj[x._id].upvoteCount,
              commentId: countObj[x._id].commentId,
              postId: postId,
              notifIds: countObj[x._id].notifIds
            })
          );
          /*
          commentMessageArray.push({
            title: `New replies and upvotes on your comment on a post in #${spaceName}!`,
            message: `${countObj[x._id].replyCount} new replies and ${countObj[x._id].upvoteCount} new upvotes`
          });*/
        });
      }
    }

    return commentMessageArray;
  },

  async createNotification(type = '', notifObject) {
    /* Notif Obj
      needs one of each row:
        WHO IS THIS FOR: ownerProfileId, or ownerProjectId,
        WHO IS THIS FROM: sendingProfileId, sendingProjectId, sendingSpaceId,
        WHAT IS THIS ABOUT: postId, commentId
    */
    const { ownerProfileId, ownerProjectId, sendingProfileId, commentId, postId } = notifObject;

    switch (type) {
      case 'new-subscriber':
        // should have ownerProjectId, sendingProfileId, NA

        // if owner and sender are the same
        if (checkForTomfoolery(ownerProfileId, sendingProfileId)) {
          break;
        } else {
          await Notification.create({ type, ownerProjectId, sendingProfileId });
        }

        break;

      case 'new-reaction': // emoji reaction to a post
        // should have (ownerProjectId OR ownerProfileId), postId, sendingProfileId
        if (checkForTomfoolery(ownerProfileId, sendingProfileId)) {
          break;
        } else {
          await Notification.create({ type, ownerProjectId, ownerProfileId, sendingProfileId, postId });
        }

        break;

      case 'new-comment': // new comment in direct reply to a post
        if (checkForTomfoolery(ownerProfileId, sendingProfileId)) {
          break;
        } else {
          await Notification.create({ type, ownerProjectId, ownerProfileId, sendingProfileId, postId });
        }

        break;

      case 'new-reply': // new reply to a comment of yours
        if (checkForTomfoolery(ownerProfileId, sendingProfileId)) {
          break;
        } else {
          await Notification.create({ type, ownerProfileId, sendingProfileId, commentId });
        }

        break;

      case 'new-upvote': // new upvote on one of your comments
        //let { ownerProfileId, sendingProfileId, commentId } = notifObject;
        if (checkForTomfoolery(ownerProfileId, sendingProfileId)) {
          break;
        } else {
          await Notification.create({ type, ownerProfileId, sendingProfileId, commentId });
        }

        break;

      default:
        break;
    }
  }

  /*readablePostNotification(contentObject) {

  },*/
};
