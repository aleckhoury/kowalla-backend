// Dependencies

// Models
const Post = require('../models/post');
const Subscriptions = require('../models/subscription');

module.exports = {
  async getActivePostByUser(request, reply) {
    // Init
    const { username } = request.params;
    // Act
    const posts = await Post.findOne({username, isActive: true});

    // Send
    reply.code(200).send(posts);
  },

  async getProfilePostList(request, reply) { // add sorting
    // Init
    let { profileId, sort, skip } = request.params;
    skip = Number(skip);

    try {
      // Act
      let posts;
      if (sort === 'Newest') {
        posts = await Post.find({ profileId }).limit(5).sort('-createdAt').skip(skip);
      } else if (sort === 'Oldest') {
        posts = await Post.find({ profileId }).limit(5).sort('createdAt').skip(skip);
      }
      if (posts.length) {
        return reply.code(200).send(posts);
      }
      return reply.code(204).send('No posts yet!');
    } catch(err) {
      return reply.code(500).send(err, 'An error occurred while fetching posts');
    }
  },

  async getProjectPostList(request, reply) { // add sorting
    // Init
    let { projectId, sort, skip } = request.params;
    skip = Number(skip);

    try {
      // Act
      let posts;
      if (sort === 'Newest') {
        posts = await Post.find({ projectId }).limit(5).sort('-createdAt').skip(skip);
      } else if (sort === 'Oldest') {
        posts = await Post.find({ projectId }).limit(5).sort('createdAt').skip(skip);
      }
      if (posts.length) {
        return reply.code(200).send(posts);
      }
      return reply.code(204).send('No posts yet!');
    } catch(err) {
      return reply.code(500).send(err, 'An error occurred while fetching posts');
    }
  },
  async updatePost(request, reply) {
      // Init
      const { postId } = request.params;
      const updateParams = request.body;
      // Act
      await Post.findOneAndUpdate({_id: postId}, updateParams);
      const post = await Post.findOne({_id: postId});
      // Send

    if (post !== null && post !== undefined) {
      await post.save();
    }

      reply.code(200).send(post);
    },
  async getSpacePostList(request, reply) { // add sorting
    // Init
    let { spaceId, sort, skip } = request.params;
    skip = Number(skip);

    try {
      // Act
      let posts;
      if (sort === 'Newest') {
        posts = await Post.find({spaceId}).limit(5).sort('-createdAt').skip(skip);
      } else if (sort === 'Oldest') {
        posts = await Post.find({spaceId}).limit(5).sort('createdAt').skip(skip);
      }
      // Send
      if (posts.length) {
        return reply.code(200).send(posts);
      }
      return reply.code(204).send('No posts yet!');
    } catch(err) {
      return reply.code(500).send(err, 'An error occurred while fetching posts');
    }

  },
  async getSubscribedPosts(request, reply) {
    // Init
    let { profileId, sort, skip } = request.params;
    skip = Number(skip);
    try {
      const subs = await Subscriptions.find({ profileId }).select('projectId spaceId');
      const idList = subs.map(x => x.projectId ? x.projectId : x.spaceId);
      // // Act
      let posts;
      if (sort === 'Newest') {
        posts = await Post.find({
          // Find documents matching any of these values
          $or: [
            {'projectId': {$in: idList}},
            {'spaceId': {$in: idList}}
          ],
        }).limit(5).sort('-createdAt').skip(skip);
      } else if (sort === 'Oldest') {
        posts = await Post.find({
          // Find documents matching any of these values
          $or: [
            {projectId: {$in: idList}},
            {spaceId: {$in: idList}}
          ],
        }).limit(5).sort('createdAt').skip(skip);
      }
      if (posts.length) {
        return reply.code(200).send(posts);
      }
      return reply.code(204).send('No posts yet!');
    } catch(err) {
      return reply.code(500).send(err, 'An error occurred while fetching posts');
    }
  },
  async getPosts(request, reply) {
    // Init
    let { sort, skip } = request.params;
    skip = Number(skip);
    try {
      // Act
      let posts;
      if (sort === 'Newest') {
        posts = await Post.find({}).limit(5).sort('-createdAt').skip(skip);
      } else if (sort === 'Oldest') {
        posts = await Post.find({}).limit(5).sort('createdAt').skip(skip);
      }
      if (posts.length) {
        return reply.code(200).send(posts);
      }
      return reply.code(204).send('No posts yet!');
    } catch(err) {
      return reply.code(500).send(err, 'An error occurred while fetching posts');
    }
  },

  async getPost(request, reply) {
    // Init
    const { id } = request.params;

    // Act
    const post = await Post.findOne({_id: id});
    // Send
    reply.code(200).send(post);
  },

  async createPost(request, reply) {
    // Init
    const {
      profileId,
      projectId,
      spaceId,
      content,
      duration,
      start,
      end,
      isActive,
      username,
    } = request.body;

    const views = 0;

    // Act
    const post = await Post.create({
      profileId,
      projectId,
      spaceId,
      content,
      views,
      duration,
      start,
      end,
      isActive,
      username });

    // Send
    await post.save();
    reply.code(201).send(post);
  },

  async deletePost(request, reply) {
    // Init
    const { postId } = request.params;

    // Act
    await Post.findOneAndDelete({_id: postId});
    const post = await Post.findOne({_id: postId});

    // Send
    reply.code(204).send(post);
  },
}
