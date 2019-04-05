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

  async getProfilePostList(req, res, next) { // add sorting
    // Init
    let { profileId, sort, skip } = req.params;
    skip = Number(skip);

    // Act
    let posts;
    if (sort === 'Newest') {
      posts = await Post.find({ profileId }).limit(5).sort('-createdAt').skip(skip);
    } else if (sort === 'Oldest') {
      posts = await Post.find({ profileId }).limit(5).sort('createdAt').skip(skip);
    }

    // Send
    res.status(200).send({posts});
  },

  async getProjectPostList(req, res, next) { // add sorting
    // Init
    let { projectId, sort, skip } = req.params;
    skip = Number(skip);

    // Act
    let posts;
    if (sort === 'Newest') {
      posts = await Post.find({ projectId }).limit(5).sort('-createdAt').skip(skip);
    } else if (sort === 'Oldest') {
      posts = await Post.find({ projectId }).limit(5).sort('createdAt').skip(skip);
    }

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
    if (post !== null && post !== undefined) {
      await post.save();
    }
      res.status(200).send(post);
    },
  async getCommunityPostList(req, res, next) { // add sorting
    // Init
    let { communityId, sort, skip } = req.params;
    skip = Number(skip);

    // Act
    let posts;
    if (sort === 'Newest') {
      posts = await Post.find({communityId}).limit(5).sort('-createdAt').skip(skip);
    } else if (sort === 'Oldest') {
      posts = await Post.find({communityId}).limit(5).sort('createdAt').skip(skip);
    }

    // Send
    res.status(200).send({posts});
  },

  async getPosts(req, res, next) {
    // Init
    let { sort, skip } = req.params;
    skip = Number(skip);
    // Act
    let posts;
    if (sort === 'Newest') {
      posts = await Post.find({}).limit(5).sort('-createdAt').skip(skip);
    } else if (sort === 'Oldest') {
      posts = await Post.find({}).limit(5).sort('createdAt').skip(skip);
    }
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
