const Fastify = require("fastify");
const { mongooseConnect } = require("../helpers/mongoose");

const profileRoutes = require("../routes/profile_routes");
const projectRoutes = require("../routes/project_routes");
const spaceRoutes = require("../routes/space_routes");
const userRoutes = require("../routes/user_routes");
const postRoutes = require("../routes/post_routes");
const imageRoutes = require("../routes/image_routes");
const reactionRoutes = require("../routes/reaction_routes");
const configRoutes = require("../routes/config_routes");
const commentRoutes = require("../routes/comment_routes");
const upvoteRoutes = require("../routes/upvote_routes");
const searchRoutes = require("../routes/search_routes");
const oAuthRoutes = require("../routes/oauth_routes");
const integrationRoutes = require("../routes/integration_routes");

const cors = require("fastify-cors");
const compress = require("fastify-compress");

module.exports = {
  Fastify,
  appInit({ logger = false } = {}) {
    const app = Fastify({ logger: { level: "debug" } });
    let mongoose;

    app.register(cors);
    app.register(compress);

    app.register(async () => {
      mongoose = await mongooseConnect();
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
      { prefix: "/api/v1" }
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
