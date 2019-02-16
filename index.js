const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testRoutes = require('./routes/test_routes');
const profileRoutes = require('./routes/profile_routes');
const projectRoutes = require('./routes/project_routes');
const communityRoutes = require('./routes/community_routes');
const userRoutes = require('./routes/user_routes');
const postRoutes = require('./routes/post_routes');
const uploadRoutes = require('./routes/upload_routes');
const reactionRoutes = require('./routes/reaction_routes');
const configRoutes = require('./routes/config_routes');
const jwt = require('./helpers/jwt');
const cors = require('cors');

const app = express();

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080

app.set('port', port);

// setup mongodb connection
const mLabPath = "mongodb://" + process.env.MONGO_USERNAME.toString() + ":" + process.env.MONGO_PASSWORD.toString() + "@" + process.env.MLAB_SERVER.toString() + ".mlab.com:" + process.env.MLAB_PORT_AND_DB.toString();
mongoose.connect(mLabPath);
mongoose.connection
  .once('open', () => {
    console.log('mongoose connection is good to go')
  })
  .on('error', (error) => {
    console.log('this is the warning to the warning!');
    console.warn('Warning', error);
  });

// Require authentication to access API routes
// Disabled for ease of development until we have auth fully setup
// app.use(jwt());

// setup app
app.use(bodyParser.json());
app.use(cors());

// expand routes
testRoutes(app);
profileRoutes(app);
projectRoutes(app);
communityRoutes(app);
userRoutes(app);
postRoutes(app);
reactionRoutes(app);
uploadRoutes(app);
configRoutes(app);

app.listen(port, () => {
  console.log("API SERVER");
  console.log(`Running on port ${port}`);
  console.log("Enter Ctrl + C to stop");
});
