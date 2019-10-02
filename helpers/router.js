const Fastify = require('fastify');
const { mongooseConnect } = require('../helpers/mongoose');

const profileRoutes = require('../routes/profile');
const projectRoutes = require('../routes/project');
const spaceRoutes = require('../routes/space');
const userRoutes = require('../routes/user');
const postRoutes = require('../routes/post');
const imageRoutes = require('../routes/image');
const reactionRoutes = require('../routes/reaction');
const configRoutes = require('../routes/config');
const commentRoutes = require('../routes/comment');
const upvoteRoutes = require('../routes/upvote');
const searchRoutes = require('../routes/search');
const oAuthRoutes = require('../routes/oauth');
const integrationRoutes = require('../routes/integration');

const cors = require('fastify-cors');
const compress = require('fastify-compress');

module.exports = {
  Fastify,
  appInit({ logger = false } = {}) {
    const app = Fastify({ logger: { level: 'debug' } });
    let mongoose;

    app.register(cors);
    app.register(compress);

    app.register(async () => {
      mongoose = await mongooseConnect();
    });

    // expand routes
    app.register(
      async registerApp => {
        profileRoutes(app);
        projectRoutes(registerApp);
        spaceRoutes(app);
        userRoutes(app);
        postRoutes(app);
        reactionRoutes(app);
        imageRoutes(app);
        configRoutes(app);
        commentRoutes(app);
        upvoteRoutes(app);
        searchRoutes(app);
        oAuthRoutes(app);
        integrationRoutes(app);
      },
      { prefix: '/api/v1' }
    );

    return { app, mongoose };
  },

  async appListen({ app, port = process.env.PORT || 8080 }) {
    try {
      const address = await app.listen(port);
      app.log.info(`server listening on ${address}`);
      return address;
    } catch (err) {
      app.log.error(err);
      throw new Error(err.message);
    }
  }
};
