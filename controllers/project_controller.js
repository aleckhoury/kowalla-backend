// Dependencies

// Models
const Project = require("../models/ProjectModel");
const Profile = require("../models/ProfileModel");
const Post = require("../models/PostModel");
const Reaction = require("../models/ReactionModel");
/*
1) Create -- first pass done
2) Delete -- first pass done
3) Get list -- first pass done
4) Get specific -- first pass done
5) update -- first pass done
*/

/* from the model
ProjectProps = {
  name: String,
  description: String,
  profilePicture: String, // TODO: change to actual image storage
  headerPicture: String, // TODO: change to actual image storage
  admins: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'profile'
    }
  }],
}
*/

async function getProfileIdsFromUsernames(usernames) {
  let idArray = [];

  for (let i = 0; i < usernames.length; i++) {
    let profileObj = await Profile.findOne({ username: usernames[i] });
    idArray.push(profileObj._id);
  }

  return idArray;
}

async function getReputation(projectId, name = "") {
  if (name !== "") {
    projectObj = await Project.findOne({ name }, "_id");
    projectId = projectObj._id;
  }

  // get array of post id values only
  let postArrayWithKeyValuePairs = await Post.find({ projectId: projectId }, "_id");
  let postArrayWithValues = postArrayWithKeyValuePairs.map(function(object) {
    return object._id;
  });

  // count all reactions
  let reactionCount = await Reaction.where({
    postId: { $in: postArrayWithValues }
  }).countDocuments();

  // how we set the value of each action
  let reactionModifier = 2;

  // return reputation
  return reactionCount * reactionModifier;
}

// TODO: add CRUD Headers
module.exports = {
  async getProjectList(req, res) {
    // Act
    projects = await Project.find({})
      .populate("subscribers")
      .populate("postCount")
      .exec(); // TODO: Add sorting

    // Send
    return { projects };
  },

  // Create
  async createProject(req, res, next) {
    // Init
    let { name, projectName, description, profilePicture, headerPicture, admins } = req.body;

    if (profilePicture === "") {
      let items = ["bd56e1", "efbbcc", "0a2049", "db9dee"];
      let item = items[Math.floor(Math.random() * items.length)];
      profilePicture = `https://ui-avatars.com/api/?name=${projectName}&background=${item}&color=${item === "efbbcc" ? "0a2049" : "fff"}&bold=true&size=200&font-size=0.6`;
    }

    try {
      // Act
      const adminIds = await getProfileIdsFromUsernames(admins);
      const project = await Project.create({
        name,
        projectName,
        description,
        profilePicture,
        headerPicture,
        admins: adminIds
      });

      await project.save();

      // Send
      const populatedProject = await Project.findOne({ _id: project._id })
        .populate("subscribers")
        .populate("postCount")
        .exec();

      res.status(201).send(populatedProject);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // Read
  async getProjectByName(req, res, next) {
    // Init
    const { projectName } = req.params;

    // Act
    let reputation = await getReputation("", projectName);
    await Project.findOneAndUpdate({ name: projectName }, { reputation });

    return Project.findOne({ name: projectName })
      .populate("subscribers")
      .populate("postCount")
      .exec();
  },

  async getProject(req, res, next) {
    // Init
    const { id } = req.params;

    // Act
    let reputation = await getReputation(id);
    await Project.findOneAndUpdate({ _id: id }, { reputation });

    return Project.findOne({ _id: id })
      .populate("subscribers")
      .populate("postCount")
      .exec();
  },

  // Update
  async updateProject(req, res, next) {
    // Init
    const { id } = req.params;
    const updateParams = req.body;

    try {
      // Act
      await Project.findOneAndUpdate({ _id: id }, updateParams, {
        runValidators: true,
        context: "query"
      });
      const project = await Project.findOne({ _id: id })
        .populate("subscribers")
        .populate("postCount")
        .exec();

      // Send
      res.status(200).send(project);
      await project.save();
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // Delete
  async deleteProject(req, res, next) {
    // Init
    const { id } = req.params;

    // Act
    await Project.findOneAndDelete({ _id: id });
    const project = await Project.findOne({ _id: id });

    // Send
    res.status(204).send(project);
  }
};
