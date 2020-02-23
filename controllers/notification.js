const Notification = require('../models/notification');
const Project = require('../models/project');
const Profile = require('../models/profile');
const Comment = require('../models/comment');
const Space = require('../models/space');
const Post = require('../models/post');
const NotificationHelper = require('../helpers/notification');
const _ = require('lodash');

// Use 'n' variable for notifications to decrease cumbersome length of word
async function buildNotifications(n) {
  let formattedNotifications = [];
  for (let i in n) {
    let space;
    let project;
    let profile;
    let post;
    let content;
    let link;
    formattedNotifications[i] = { _id: n[i]._id, profilePicture: n[i].sendUserProfilePic, viewed: n[i].viewed };
    const linkStyle = '<span style="font-weight: 700; color: #39C9A0;">';
    switch (n[i].type) {
      case 'reaction':
        if (n[i].projectId) {
          project = await Project.findOne({ _id: n[i].projectId }, 'name').lean();
          link = `/project/${project.name}/posts/${n[i].postId}`;
        } else {
          post = await Post.findOne({ _id: n[i].postId }, 'spaceId').lean();
          space = await Space.findOne({ _id: post.spaceId }, 'name').lean();
          link = `/space/${space.name}/posts/${n[i].postId}`;
        }
        if (n[i].count === 1) {
          if (n[i].projectId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> reacted to your post as ${linkStyle}@${project.name}</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> reacted to your post in ${linkStyle}#${space.name}</span>.`;
          }
        } else if (n[i].count === 2) {
          if (n[i].projectId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> reacted to your post as ${linkStyle}@${project.name}</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> reacted to your post in ${linkStyle}#${space.name}</span>.`;
          }
        } else {
          if (n[i].projectId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span>, ${linkStyle}@${n[i].latestSenders[1]}</span> and ${n[i].count - 2} others recently reacted to your post as ${linkStyle}@${
              project.name
            }</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span>, ${linkStyle}@${n[i].latestSenders[1]}</span> and ${n[i].count - 2} others recently reacted to your post in ${linkStyle}#${
              space.name
            }</span>.`;
          }
        }
        break;
      case 'comment':
        if (n[i].projectId) {
          project = await Project.findOne({ _id: n[i].projectId }, 'name').lean();
          link = `/project/${project.name}/posts/${n[i].postId}`;
        } else {
          post = await Post.findOne({ _id: n[i].postId }, 'spaceId').lean();
          space = await Space.findOne({ _id: post.spaceId }, 'name').lean();
          link = `/space/${space.name}/posts/${n[i].postId}`;
        }
        if (n[i].count === 1) {
          if (n[i].projectId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> commented on your post as ${linkStyle}@${project.name}</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> commented on your post in ${linkStyle}#${space.name}</span>.`;
          }
        } else if (n[i].count === 2) {
          if (n[i].projectId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> commented on your post as ${linkStyle}@${project.name}</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> commented on your post in ${linkStyle}#${space.name}</span>.`;
          }
        } else {
          if (n[i].projectId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span>, ${linkStyle}@${n[i].latestSenders[1]}</span> and ${n[i].count - 2} others recently commented on your post as ${linkStyle}@${
              project.name
            }</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span>, ${linkStyle}@${n[i].latestSenders[1]}</span> and ${n[i].count - 2} others recently commented on your post in ${linkStyle}#${
              space.name
            }</span>.`;
          }
        }
        break;
      case 'space-subscribe':
      case 'project-subscribe':
        if (n[i].spaceId) {
          space = await Space.findOne({ _id: n[i].spaceId }, 'name').lean();
          link = `/space/${space.name}`;
        } else {
          project = await Project.findOne({ _id: n[i].projectId }, 'name').lean();
          link = `/space/${project.name}`;
        }
        if (n[i].count === 1) {
          if (n[i].spaceId) {
            content = `${linkStyle}#${space.name}</span> has one new subscription from ${linkStyle}@${n[i].latestSenders[0]}</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> reacted to your post as ${linkStyle}@${project.name}</span>.`;
          }
        } else if (n[i].count === 2) {
          if (n[i].spaceId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> recently subscribed to ${linkStyle}#${space.name}</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> recently subscribed to ${linkStyle}#${project.name}</span>.`;
          }
        } else {
          if (n[i].spaceId) {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span>, ${linkStyle}@${n[i].latestSenders[1]}</span> and ${n[i].count - 2} others recently subscribed to ${linkStyle}#${
              space.name
            }</span>.`;
          } else {
            content = `${linkStyle}@${n[i].latestSenders[0]}</span>, ${linkStyle}@${n[i].latestSenders[1]}</span> and ${n[i].count - 2} others recently subscribed to ${linkStyle}@${
              project.name
            }</span>.`;
          }
        }
        break;
      case 'reply':
        profile = await Profile.findOne({ _id: n[i].profileId }, 'username').lean();
        post = await Post.findOne({ _id: n[i].postId }, 'projectId spaceId').lean();
        if (post.projectId) {
          project = await Project.findOne({ _id: post.projectId }, 'name').lean();
          link = `/project/${project.name}/posts/${n[i].postId}`;
        } else if (post.spaceId) {
          space = await Space.findOne({ _id: post.spaceId }, 'name').lean();
          link = `/space/${space.name}/posts/${n[i].postId}`;
        }
        if (n[i].count === 1) {
          content = `${linkStyle}@${n[i].latestSenders[0]}</span> replied to your comment on ${linkStyle}@${profile.username}</span>'s post.`;
        } else {
          content = `${linkStyle}@${n[i].latestSenders[0]}</span> and ${linkStyle}@${n[i].latestSenders[1]}</span> recently replied to your comment on ${linkStyle}@${profile.username}</span>'s post.`;
        }
        break;
      case 'upvote':
        profile = await Profile.findOne({ _id: n[i].profileId }, 'username').lean();
        const comment = await Comment.findOne({ _id: n[i].commentId }, 'postId').lean();
        post = await Post.findOne({ _id: comment.postId }, 'projectId spaceId').lean();
        if (post.projectId) {
          project = await Project.findOne({ _id: post.projectId }, 'name').lean();
          link = `/project/${project.name}/posts/${n[i].postId}`;
        } else if (post.spaceId) {
          space = await Space.findOne({ _id: post.spaceId }, 'name').lean();
          link = `/space/${space.name}/posts/${n[i].postId}`;
        }
        content = `${n[i].count} ${n[i].count > 1 ? 'people have' : 'person has'} recently upvoted to your comment on ${linkStyle}@${profile.username}</span>'s post.`;
      case 'new-creation':
        profile = await Profile.findOne({ _id: n[i].profileId }, 'username').lean();
        if (n[i].projectId) {
          project = await Project.findOne({ _id: n[i].projectId }, 'name').lean();
          link = `/project/${project.name}/edit`;
          content = `Congrats on creating ${linkStyle}@${project.name}</span>! Click here to add a profile picture and cover photo for your new project!`;
        } else if (n[i].spaceId) {
          space = await Space.findOne({ _id: n[i].spaceId }, 'name').lean();
          link = `/space/${space.name}/edit`;
          content = `Congrats on creating ${linkStyle}#${space.name}</span>! Click here to add a profile picture and cover photo for your new space!`;
        }
    }
    formattedNotifications[i].content = content;
    formattedNotifications[i].link = link;
  }
  return formattedNotifications;
}

module.exports = {
  async getNotificationsList(request, reply) {
    const { profileId } = request.params;
    const newNotifications = await Notification.find({ profileId })
      .sort({ viewed: 1, createdAt: -1 })
      .limit(10)
      .lean();
    const result = await buildNotifications(newNotifications);

    reply.send({ result });
  },

  async readNotifs(request, reply) {
    let data = request.body.data;
    await Notification.updateMany({ _id: { $in: data.notifIds } }, { viewed: true });
    // Send
    reply.code(204).send({ success: true });
  }
};
