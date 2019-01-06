// Dependencies

// Models
const Community = require('../models/CommunityModel');

/*
1) Create -- first pass done
2) Delete -- first pass done
3) Get list -- first pass done
4) Get specific -- first pass done
5) update -- first pass done
*/

/*
{
  name: String,
  description: String,
  headerPicture: String, // TODO: change to actual image storage
  admins: [String],
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

module.exports = {
  async getCommunityList(req, res, next) {
      // Init
      communities = await Community.find({});

      // Send
      res.send({communities});
  },

  async getCommunity(req, res, next) {
      // Init
      const { communityId } = req.params;

      // Act
      const community = await Community.findOne({_id: communityId});

      // Send
      res.status(200).send(community);
  },

  async createCommunity(req, res, next) {
      // Init
      const {
        name,
        description,
        headerPicture,
        admins,
      } = req.body;

      // Act
      const adminIds = await getProfileIdsFromUsernames(admins);
      const community = await Community.create({
        name,
        description,
        headerPicture,
        admins,
      });

      // Send
      await community.save();
      res.status(201).send(community);
  },

  async updateCommunity(req, res, next) {
      // Init
      const { communityId } = req.params;
      const updateParams = req.body;

      // Act
      await Community.findOneAndUpdate({_id: communityId}, updateParams);
      const community = await Community.findOne({_id: communityId});

      // Send
      res.status(200).send(community);
  },

  async deleteCommunity(req, res, next) {
      // Init
      const { communityId } = req.params;

      // Act
      await Community.findOneAndDelete({_id: communityId});
      const community = await Community.findOne({_id: communityId});

      // Send
      res.status(204).send(community);
  },
}
