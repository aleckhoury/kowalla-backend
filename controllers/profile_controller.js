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

/*
1) Create -- first pass done
2) Delete -- first pass done
3) Get list -- first pass done -> needs sorting
4) Get specific -- first pass done
5) update -- first pass done
*/
module.exports = {
  async getProfileList(req, res, next) {
    // Init
    const profiles = await Profile.find({}); // TODO: Add sorting

    // Send
    res.send({profiles});
  },

  async createProfile(req, res, next) {
    // Init
    const profileProps = req.body;

    // Act
    const profile = await Profile.create(profileProps);

    // Send
    await profile.save();
    res.status(201).send(profile);
  },
  async getProfileByUsername(req, res, next) {
    // Init
    const { username } = req.params;
    try {
      // Act
      const user = await Profile.findOne({ username });
      // Send
      res.status(200).send(user)
    } catch(err) {
    }
  },
  async getProfile(req, res, next) {
    // Init
    const { profileId } = req.params;

    // Act
    const profile = await Profile.findOne({_id: profileId});

    // Send
    res.status(200).send(profile)
  },

  async updateProfile(req, res, next) {
    // Init
    const { profileId } = req.params;
    const updateParams = req.body;

    // Act
    await Profile.findOneAndUpdate({_id: profileId}, updateParams);
    const profile = await Profile.findOne({_id: profileId});

    // Send
    await profile.save();
    res.status(200).send(profile);

  },

  async deleteProfile(req, res, next) {
    // Init
    const { profileId } = req.params;

    // Act
    await Profile.findOneAndDelete({_id: profileId});
    const profile = await Profile.findOne({_id: profileId});

    // Send
    res.status(204).send(profile);
  },

}
