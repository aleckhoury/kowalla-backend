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

const compress = require('fastify-compress');

module.exports = {
  Fastify,
  appInit({ logger = { level: 'warn' }, mongoUrl = '' } = {}) {
    const app = Fastify({ logger });
    let mongoose;
    app.use(require('cors')());
    // app.register(require('fastify-cors'), {
    //     origin: true,
    //     allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    //     methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'] });
    app.register(compress);
    app.register(require('fastify-multipart'));

    app.register(async () => {
      mongoose = await mongooseConnect(mongoUrl);
    });

    // expand routes
    app.register(
      async registerApp => {
        profileRoutes(registerApp);
        projectRoutes(registerApp);
        spaceRoutes(registerApp);
        userRoutes(registerApp);
        postRoutes(registerApp);
        reactionRoutes(registerApp);
        imageRoutes(registerApp);
        configRoutes(registerApp);
        commentRoutes(registerApp);
        upvoteRoutes(registerApp);
        searchRoutes(registerApp);
        oAuthRoutes(registerApp);
        integrationRoutes(registerApp);
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
