// Models
const Profile = require('../models/ProfileModel');
const Space = require('../models/SpaceModel');
const Project = require('../models/ProjectModel');

module.exports = {
  async mvpSearch(req, res, next) {
    let profiles = await Profile.find({});
    let spaces = await Space.find({});
    let projects = await Project.find({});

    let responseArray = [];

    for (let i=0; i < profiles.length; i++) {
      if (profiles[i].firstName !== undefined) {

        responseArray.push({
          name: `${profiles[i].firstName} ${profiles[i].lastName}`,
          profileId: profiles[i]._id,
          picture: profiles[i].profilePicture
        });
      }
    }

    for (let i=0; i < projects.length; i++) {
      if (projects[i].name !== undefined) {

        responseArray.push({
          name: projects[i].name,
          projectId: projects[i]._id,
          picture: projects[i].profilePicture
        });
      }
    }

    for (let i=0; i < spaces.length; i++) {
      if (spaces[i].name !== undefined) {

        responseArray.push({
          name: spaces[i].name,
          spaceId: spaces[i]._id,
          picture: spaces[i].profilePicture
        });
      }
    }

    res.send(responseArray)
  }
}
