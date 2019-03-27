// Dependencies

// Models
const Post = require('../models/PostModel');

module.exports = {
  async getActivePostByUser(req, res, next) {
    // Init
    const { profileId } = req.params;
    // Act
    const posts = await Post.findOne({profileId, isActive: true});

    // Send
    res.status(200).send(posts);
  },

  async getBlogPosts(req, res, next) {
    // Act
    // Fetch hardcoded list of our blog posts so we don't need to add extra properties to posts
    const posts = await Post.find({_id: ['bOVESikDy', 'uxWP0nd_C']});

    // Send
    res.status(200).send({posts});
  },

  async getProfilePostList(req, res, next) { // add sorting
    // Init
    const { profileId } = req.params;

    // Act
    const posts = await Post.find({profileId});

    // Send
    res.status(200).send({posts});
  },

  async getProjectPostList(req, res, next) { // add sorting
    // Init
    const { projectId } = req.params;

    // Act
    const posts = await Post.find({projectId});

    // Send
    res.status(200).send({posts});
  },
  async updatePost(req, res, next) {
      // Init
      const { postId } = req.params;
      const updateParams = req.body;
      // Act
      await Post.findOneAndUpdate({_id: postId}, updateParams);
      const post = await Post.findOne({_id: postId});
      // Send
      await post.save();
      res.status(200).send(post);
    },
  async getCommunityPostList(req, res, next) { // add sorting
    // Init
    const { communityId } = req.params;

    // Act
    const posts = await Post.find({communityId});

    // Send
    res.status(200).send({posts});
  },

  async getPosts(req, res, next) {
    // Init

    // Act
    const posts = await Post.find({});
    // Send
    res.status(200).send(posts);
  },

  async getPost(req, res, next) {
    // Init
    const { id } = req.params;

    // Act
    const post = await Post.findOne({_id: id});
    // Send
    res.status(200).send(post);
  },

  async createPost(req, res, next) {
    // Init
    const {
      profileId,
      projectId,
      content,
      duration,
      expiration,
      isActive,
      userCompleted,
    } = req.body;

    const { communityId } = req.params;
    const views = 0;

    // Act
    const post = await Post.create({
      profileId,
      projectId,
      communityId,
      content,
      views,
      duration,
      expiration,
      isActive,
      userCompleted});

    // Send
    await post.save();
    res.status(201).send(post);
  },

  async deletePost(req, res, next) {
    // Init
    const { postId } = req.params;

    // Act
    await Post.findOneAndDelete({_id: postId});
    const post = await Post.findOne({_id: postId});

    // Send
    res.status(204).send(post);
  },
}
