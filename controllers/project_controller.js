// Dependencies

// Models
const Project = require('../models/ProjectModel');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostModel');
const Reaction = require('../models/ReactionModel');
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

  for (let i=0; i<usernames.length; i++) {
    let profileObj = await Profile.findOne({username: usernames[i]});
    idArray.push(profileObj._id)
  }

  return idArray;
}

async function getReputation(projectId, name="") {

  if (name !== "") {
    console.log('using name');
    projectObj = await Project.findOne({name}, '_id');
    projectId = projectObj._id;
  }

  // get array of post id values only
  let postArrayWithKeyValuePairs = await Post.find({projectId: projectId}, '_id')
  let postArrayWithValues = postArrayWithKeyValuePairs.map(function (object) { return object._id});

  // count all reactions
  let reactionCount = await Reaction.where({ 'postId': { $in: postArrayWithValues }}).countDocuments();

  // how we set the value of each action
  let reactionModifier = 2;


  // return reputation
  return (reactionCount*reactionModifier);
}


// TODO: add CRUD Headers
module.exports = {
  async getProjectList(req, res, next) {
    // Act
    projects = await Project.find({})
      .populate('subscribers')
      .populate('postCount')
      .exec();// TODO: Add sorting

    // Send
    res.send({projects});
  },


  // Create
  async createProject(req, res, next) {
    // Init
    const {
      name,
      description,
      profilePicture,
      headerPicture,
      admins,
    } = req.body;

    // Act
    const adminIds = await getProfileIdsFromUsernames(admins);
    const project = await Project.create({
      name,
      description,
      profilePicture,
      headerPicture,
      admins: adminIds
    });

    await project.save();

    // Send
    const populatedProject = await Project.findOne({ _id: project._id })
      .populate('subscribers')
      .populate('postCount')
      .exec();

    res.status(201).send(populatedProject);
  },

  // Read
  async getProjectByName(req, res, next) {
    // Init
    const { projectName } = req.params;

    // Act
    let reputation = await getReputation("", projectName);
    await Project.findOneAndUpdate({ name: projectName }, {reputation})

    const project = await Project.findOne({name: projectName})
      .populate('subscribers')
      .populate('postCount')
      .exec();

    // Send
    
    res.status(200).send(project);
  },

  async getProject(req, res, next) {
    // Init
    const { id } = req.params;

    // Act
    let reputation = await getReputation(id);
    await Project.findOneAndUpdate({ _id: id }, {reputation})


    const project = await Project.findOne({_id: id})
      .populate('subscribers')
      .populate('postCount')
      .exec();

    // Send
    res.status(200).send(project);
  },

  // Update
  async updateProject(req, res, next) {
    // Init
    const { id } = req.params;
    const updateParams = req.body;

    // Act
    await Project.findOneAndUpdate({_id: id}, updateParams);
    const project = await Project.findOne({_id: id})
      .populate('subscribers')
      .populate('postCount')
      .exec();

    // Send
    await project.save();
    res.status(200).send(project);
  },

  // Delete
  async deleteProject(req, res, next) {
    // Init
    const { id } = req.params;

    // Act
    await Project.findOneAndDelete({_id: id});
    const project = await Project.findOne({_id: id});

    // Send
    res.status(204).send(project);
  },
}
