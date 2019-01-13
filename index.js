const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testRoutes = require('./routes/test_routes');
const profileRoutes = require('./routes/profile_routes');
const projectRoutes = require('./routes/project_routes');
const communityRoutes = require('./routes/community_routes');
const userRoutes = require('./routes/user_routes');
const jwt = require('./helpers/jwt');

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// expand routes
testRoutes(app);
profileRoutes(app);
projectRoutes(app);
communityRoutes(app);
userRoutes(app);

app.listen(port, () => {
  console.log("API SERVER");
  console.log(`Running on port ${port}`);
  console.log("Enter Ctrl + C to stop");
});
