const Project = require('../models/ProjectModel');
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
const Community = require('../models/CommunityModel');
const _ = require('lodash');

module.exports = {
  async formalizeSubscriptionNotifs(subscriptionObj) {

    let subscriptionMessageArray = []; // holder for our subscription message objs
    let projectIdArray = []; // temporarily used for the query

    for (let projectId in subscriptionObj) {
      projectIdArray.push(projectId);
    }

    // search for matching projects
    let projects = await Project.find({ _id: { $in: projectIdArray }}, 'name');

    // for each project found, match it with the corresponding notification
    // and build the notification message
    for (let i in projects) {
      subscriptionMessageArray.push({
        title: `@${projects[i].name} has new subscriptions!`,
        message: `You've gained ${subscriptionObj[projects[i]._id].length} new followers!`
      });
    }

    return subscriptionMessageArray;
  },

  async formalizePostInteractionNotifs(postObject) {
    let postMessageArray = []; // holder for our post interaction message objs
    let countObj = {}; // temporary holder for the counts of reactions and comments
    let postIdsForQuery = []; // need to store postIds for query

    for (let postId in postObject) {
      postIdsForQuery.push(postId);

      // sort the array by reactions and comments, so we can count easily
      let tempObj = _.groupBy(postObject[postId], (subObj) => subObj.type);

      // add to the CountObj if we have the event type
      countObj[postId] = {
        reactionCount: (tempObj['new-reaction'] !== undefined) ? tempObj['new-reaction'].length : 0,
        commentCount: (tempObj["new-comment"] !== undefined) ? tempObj['new-reaction'].length : 0
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
        postMessageArray.push({
          title: `New comments and reactions on your post in #${communityName}!`,
          message: `${countObj[x._id].commentCount} new comments and ${countObj[x._id].reactionCount} new reactions`
        });
      });
    }

    return postMessageArray
  },

  async formalizeCommentInteractionNotifs(commentObj) {
    let commentMessageArray = [];
    let countObj = {};
    let commentIdsForQuery = [];

    for (let commentId in commentObj) {
      commentIdsForQuery.push(commentId);

      let tempObj = _.groupBy(commentObj[commentId], (subObj) => subObj.type);

      countObj[commentId] = {
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
          commentMessageArray.push({
            title: `New replies and upvotes on your comment on a post in #${communityName}!`,
            message: `${countObj[x._id].replyCount} new replies and ${countObj[x._id].upvoteCount} new upvotes`
          });
        });
      }
    }

    return commentMessageArray;
  }
}
