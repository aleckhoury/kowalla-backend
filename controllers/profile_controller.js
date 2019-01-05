// Dependencies

// Models
const Profile = require('../models/ProfileModel');

/*
ProfileProps = {
  name: String,
  username: String,
  description: String,
  profilePicture: String, // TODO: update to have image upload
  uiColor: String, // string #XXXXXX
}
*/
module.exports = {
  getProfileList(req, res, next) {
    res.send({ function: 'getProfileList' });
  },

  createProfile(req, res, next) {
    //res.send({ function: 'createProfile' });
    const profileProps = req.body;

    Profile.create(profileProps)
      .then(profile => res.send(profile))
      .catch(err => console.log(err));

  },

  getProfile(req, res, next) {
    res.send({ function: 'getProfile' });
  },

  updateProfile(req, res, next) {
    res.send({ function: 'updateProfile' });
  },

  deleteProfile(req, res, next) {
    res.send({ function: 'deleteProfile' });
  },
}
