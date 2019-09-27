const express = require("express");
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
const emailRoutes = require("../routes/email_routes");
const errorHandler = require("../helpers/error-handler");
const cors = require("cors");
const compression = require("compression");

module.exports = {
  express,
  appInit() {
    const app = new express();

    // Don't allow users to see we're using Express
    app.disable("x-powered-by");

    // app.use(function(req, res, next) {
    //   let allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000', 'https://kowalla.co', 'https://kowalla-app-tob.herokuapp.com'];
    //   let origin = req.headers.origin;
    //   if(allowedOrigins.indexOf(origin) > -1){
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    //   }
    //
    //   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //   res.header('Access-Control-Allow-Credentials', true);
    //   return next();
    // });

    // Require authentication to access API routes
    // Disabled for ease of development until we have auth fully setup
    // app.use(jwt());
    app.use(errorHandler);

    // setup app
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(compression());

    // expand routes
    profileRoutes(app);
    projectRoutes(app);
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
    emailRoutes(app);

    return app;
  }
};
