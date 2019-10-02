// Dependencies
const User = require('../models/user');
const Profile = require('../models/profile');
const Subscription = require('../models/subscription');
const Project = require('../models/project');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Email = require('../helpers/email');

// Models

module.exports = {
  async createUser(req, res, next) {
    let items = ['bd56e1', 'efbbcc', '0a2049', 'db9dee'];
    let item = items[Math.floor(Math.random() * items.length)];
    let projCheck = await Project.find({ projectName: req.body.username });
    if (projCheck.length) {
      throw 'This username is already taken';
    }
    await bcrypt.hash(req.body.password, 10, async function(err, hash) {
      try {
        let newUser = await User.create({
          email: req.body.email,
          username: req.body.username,
          password: hash
        });
        await newUser.save();
        let profile = await Profile.create({
          firstName: req.body.username,
          lastName: '',
          username: req.body.username,
          integrations: ['Embed Video'],
          description: '',
          profilePicture: `https://ui-avatars.com/api/?name=${req.body.username}&background=${item}&color=${item === 'efbbcc' ? '0a2049' : 'fff'}&bold=true&size=200&font-size=0.6`,
          userId: newUser._id
        });
        const subscription = await Subscription.create({
          profileId: profile._id,
          spaceId: 'fugmXEmwr'
        });
        const subscription2 = await Subscription.create({
          profileId: profile._id,
          projectId: 'nLw0dX1O5'
        });
        await profile.save();
        await subscription.save();
        await subscription2.save();
        const token = await jwt.sign({ sub: newUser._id }, process.env.secret);
        const {
          _doc: { _id, username, password },
          ...userWithoutPassword
        } = await newUser;
        await Email.sendWelcomeEmail(req.body.username, req.body.email);
        return res.status(200).json({
          data: {
            _id,
            username,
            token
          }
        });
      } catch (err) {
        console.log(err);
        return res.status(400).jsonp({
          status: 'error',
          message: 'This username or email is already taken.'
        });
      }
    });
  },
  async authUser(req, res, next) {
    const globalRes = res;
    let user;
    try {
      if (req.body.usernameOrEmail === '.*') {
        throw 'Invalid username';
      }
      if (req.body.usernameOrEmail.includes('@')) {
        user = await User.findOne({
          email: req.body.usernameOrEmail
        });
      } else {
        user = await User.findOne({
          username: req.body.usernameOrEmail
        });
      }
      if (!user) {
        return globalRes.status(400).jsonp({
          status: 'error',
          message: 'Invalid username'
        });
      }
      await bcrypt.compare(req.body.password, user.password, function(err, res) {
        if (res) {
          const token = jwt.sign({ sub: user._id }, process.env.secret);
          const {
            _doc: { _id, username, password },
            ...userWithoutPassword
          } = user;
          return globalRes.status(200).json({
            username,
            token
          });
        } else {
          return globalRes.status(400).jsonp({
            status: 'error',
            message: 'Incorrect Password'
          });
        }
      });
    } catch (err) {
      return globalRes.status(400).jsonp({
        status: 'error',
        message: err
      });
    }
  }
};
