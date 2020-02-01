// Dependencies

// Models
const Profile = require('../models/profile');
const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
const Reaction = require('../models/reaction');
const Upvote = require('../models/upvote');
const Space = require('../models/space');
const Project = require('../models/project');

async function getReputationByProfileId(profileId, username = '') {
  if (username !== '') {
    const profileObj = await Profile.findOne({ username }, '_id');
    profileId = profileObj._id;
  }

  // get array of post id values only
  let postArrayWithKeyValuePairs = await Post.find({ profileId: profileId }, '_id');
  let postArrayWithValues = postArrayWithKeyValuePairs.map(function(object) {
    return object._id;
  });

  // count all reactions
  let reactionCount = await Reaction.where({ postId: { $in: postArrayWithValues } }).countDocuments();

  // get array of comment id values only
  let commentArrayWithKeyValuePairs = await Comment.find({ profileId: profileId }, '_id');
  let commentArrayWithValues = commentArrayWithKeyValuePairs.map(function(object) {
    return object._id;
  });

  // count all upvotes
  let upvoteCount = await Upvote.where({ _id: { $in: commentArrayWithValues } }).countDocuments();

  // how we set the value of each action
  let upvoteModifier = 1;
  let reactionModifier = 2;

  // return reputation
  return upvoteModifier * upvoteCount + reactionModifier * reactionCount;
}
module.exports = {
  async getAllSubscriptionOptions(request, reply) {
    const spaces = await Space.find({}).populate('subscribers').sort('subscribers').limit(3);
    const projects = await Project.find({}).populate('subscribers').sort('subscribers').limit(3);
    const list = spaces.concat(projects);

    reply.code(201).send(list);
  },
  async getProfileList(request, reply) {
    // Init
    const profiles = await Profile.find({})
      .populate('postCount')
      .populate('commentCount')
      .exec(); // TODO: Add sorting

    // Send
    reply.send({ profiles });
  },

  async createProfile(request, reply) {
    // Init
    const profileProps = request.body;

    // Act
    const profile = await Profile.create(profileProps);
    await profile.save();

    // Send
    const populatedProfile = await Profile.findOne({ _id: profile._id })
      .populate('postCount')
      .populate('commentCount')
      .exec(); // TODO: Add sorting
    reply.code(201).send(populatedProfile);
  },
  async getProfileByUsername(request, reply) {
    // Init
    const { username } = request.params;
    try {
      // Act
      const reputation = await getReputationByProfileId('', username);
      await Profile.findOneAndUpdate({ username }, { reputation });

      const user = await Profile.findOne({ username })
        .populate('postCount')
        .populate('commentCount')
        .exec();

      // Send
      reply.code(200).send(user);
    } catch (err) {
      console.log(err);
    }
  },
  async getProfileOnLoad(request, reply) {
    // Init
    const { username } = request.params;
    try {
      // Act
      const user = await Profile.findOne({ username })
          .populate('commentCount')
          .populate('postCount')
          .exec();
      // Send
      reply.code(200).send(user);
    } catch (err) {
      console.log(err);
    }
  },
  async getProfile(request, reply) {
    // Init
    const { profileId } = request.params;

    let reputation = await getReputationByProfileId(profileId);
    await Profile.findOneAndUpdate({ _id: profileId }, { reputation });

    // Act
    const profile = await Profile.findOne({ _id: profileId })
      .populate('postCount')
      .populate('commentCount')
      .exec();

    // Send
    reply.code(200).send(profile);
  },

  async updateProfile(req) {
    const { profileId } = req.params;
    const updateParams = req.body;
    return Profile.findByIdAndUpdate(profileId, updateParams, { new: true, runValidators: true, context: 'query' });
  },

  async toggleIntegration(request, reply) {
    // Init
    const { profileId } = request.params;
    const { integration } = request.body;
    // Act
    const profile = await Profile.findOne({ _id: profileId });
    const index = profile.integrations.indexOf(integration);

    if (index !== -1) {
      profile.integrations.splice(index, 1);
    } else {
      profile.integrations.push(integration);
    }
    await profile.save();
    // Send
    return reply.code(200).send(profile);
  },

  async deleteProfile(request, reply) {
    // Init
    const { profileId } = request.params;

    // Act
    await Profile.findOneAndDelete({ _id: profileId });
    const profile = await Profile.findOne({ _id: profileId });

    // Send
    reply.code(204).send(profile);
  }
};
