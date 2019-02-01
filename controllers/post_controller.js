// Dependencies

// Models
const Post = require('../models/PostModel');

module.exports = {
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

  async getCommunityPostList(req, res, next) { // add sorting
    // Init
    const { communityId } = req.params;

    // Act
    const posts = await Post.find({communityId});

    // Send
    res.status(200).send({posts});
  },

  async getPost(req, res, next) {
    // Init
    console.log(req);
    const { id } = req.params;
    console.log(req.params);

    // Act
    const post = await Post.findOne({_id: id});
    console.log(post)
    // Send
    res.status(200).send(post);
  },

  async createPost(req, res, next) {
    // Init
    const {
      profileId,
      projectId,
      content,
    } = req.body;

    const { communityId } = req.params;
    const views = 0;

    // Act
    const post = await Post.create({profileId, projectId, communityId, content, views})

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
