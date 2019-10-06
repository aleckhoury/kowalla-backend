// Dependencies
const User = require("../models/user");
const Profile = require("../models/profile");
const Subscription = require("../models/subscription");
const Project = require("../models/project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email = require("../helpers/email-helpers");

// Models

module.exports = {
  async createUser(request, reply) {
    let items = ["bd56e1", "efbbcc", "0a2049", "db9dee"];
    let item = items[Math.floor(Math.random() * items.length)];
    let projCheck = await Project.find({ projectName: request.body.username });
    if (projCheck.length) {
      throw "This username is already taken";
    }
    await bcrypt.hash(request.body.password, 10, async function(err, hash) {
      try {
        let newUser = await User.create({
          email: request.body.email,
          username: request.body.username,
          password: hash
        });
        await newUser.save();
        let profile = await Profile.create({
          firstName: request.body.username,
          lastName: "",
          username: request.body.username,
          integrations: ["Embed Video"],
          description: "",
          profilePicture: `https://ui-avatars.com/api/?name=${
            request.body.username
          }&background=${item}&color=${
            item === "efbbcc" ? "0a2049" : "fff"
          }&bold=true&size=200&font-size=0.6`,
          userId: newUser._id
        });
        const subscription = await Subscription.create({
          profileId: profile._id,
          spaceId: "fugmXEmwr"
        });
        const subscription2 = await Subscription.create({
          profileId: profile._id,
          projectId: "nLw0dX1O5"
        });
        await profile.save();
        await subscription.save();
        await subscription2.save();
        const token = await jwt.sign({ sub: newUser._id }, process.env.secret);
        const {
          _doc: { _id, username, password },
          ...userWithoutPassword
        } = await newUser;
        await Email.sendWelcomeEmail(request.body.username, request.body.email);
        return reply.code(200).send({
          data: {
            _id,
            username,
            token
          }
        });
      } catch (err) {
        console.log(err);
        return reply.code(400).send({
          status: "error",
          message: "This username or email is already taken."
        });
      }
    });
  },
  async authUser(request, reply) {
    let user;
    try {
      if (request.body.usernameOrEmail === ".*") {
        throw "Invalid username";
      }
      if (request.body.usernameOrEmail.includes("@")) {
        user = await User.findOne({
          email: request.body.usernameOrEmail
        });
      } else {
        user = await User.findOne({
          username: request.body.usernameOrEmail
        });
      }
      if (!user) {
        return reply.code(400).send({
          status: "error",
          message: "Invalid username"
        });
      }
      await bcrypt.compare(request.body.password, user.password, function(
        err,
        res
      ) {
        if (res) {
          const token = jwt.sign({ sub: user._id }, process.env.secret);
          const {
            _doc: { _id, username, password },
            ...userWithoutPassword
          } = user;
          return reply.code(200).send({
            username,
            token
          });
        } else {
          return reply.code(400).send({
            status: "error",
            message: "Incorrect Password"
          });
        }
      });
    } catch (err) {
      return reply.code(400).send({
        status: "error",
        message: err
      });
    }
  }
};
