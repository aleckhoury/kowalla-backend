// Dependencies

// Models
const Project = require('../models/ProjectModel');
const Profile = require('../models/ProfileModel');

/*
1) Create -- first pass done
2) Delete
3) Get list
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


// TODO: add CRUD Headers
module.exports = {
  async getProjectList(req, res, next) {
    // Act
    projects = await Project.find({}); // TODO: Add sorting

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

    // Send
    await project.save();
    res.status(201).send(project);
  },

  // Read
  async getProject(req, res, next) {
    // Init
    const { id } = req.params;

    // Act
    const project = await Project.findOne({_id: id});

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
    const project = await Project.findOne({_id: id});

    // Send
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
