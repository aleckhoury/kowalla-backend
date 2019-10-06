// Dependencies

// Models
const Space = require('../models/SpaceModel');
const Profile = require('../models/ProfileModel');

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
  async getSpaceList(request, reply) {
      // Init
      spaces = await Space.find({})
        .populate('subscribers')
        .populate('postCount')
        .exec();

      // Send
      reply.send({spaces});
  },

  async getSpaceByName(request, reply) {

    // Init
    const { spaceName } = request.params;

    // Act
    const space = await Space.findOne({name: spaceName})
      .populate('subscribers')
      .populate('postCount')
      .exec();

    // Send
    reply.code(200).send(space);
  },

  async getSpace(request, reply) {
      // Init
      const { spaceId } = request.params;

      // Act
      const space = await Space.findOne({_id: spaceId})
        .populate('subscribers')
        .populate('postCount')
        .exec();

      // Send
      reply.code(200).send(space);
  },

  async createSpace(request, reply) {
      // Init
      let {
        name,
        description,
        headerPicture,
        profilePicture,
        admins,
      } = request.body;

      if (profilePicture === '') {
          let items = ['bd56e1', 'efbbcc', '0a2049', 'db9dee'];
          let item = items[Math.floor(Math.random()*items.length)];
          profilePicture = `https://ui-avatars.com/api/?name=${name}&background=${item}&color=${item === 'efbbcc' ? '0a2049' : 'fff'}&bold=true&size=200&font-size=0.6`;
      }

      try {
          // Act
          const adminIds = await getProfileIdsFromUsernames(admins);
          const space = await Space.create({
              name,
              description,
              headerPicture,
              profilePicture,
              admins: adminIds,
          });

          await space.save();

          // Send
          const populatedSpace = await Space.findOne({ _id: space._id })
              .populate('subscribers')
              .populate('postCount')
              .exec();

          reply.code(201).send(populatedSpace);
      } catch(err) {
          reply.code(400).send(err);
      }
  },

  async updateSpace(request, reply) {
      // Init
      const { spaceId } = request.params;
      const updateParams = request.body;

      try {
          // Act
          await Space.findOneAndUpdate({_id: spaceId}, updateParams, { runValidators: true, context: 'query' });
          const space = await Space.findOne({_id: spaceId})
              .populate('subscribers')
              .populate('postCount')
              .exec();

          // Send
          reply.code(200).send(space);
      } catch(err) {
          reply.code(400).send(err);
      }
  },

  async deleteSpace(request, reply) {
      // Init
      const { spaceId } = request.params;

      // Act
      await Space.findOneAndDelete({_id: spaceId});
      const space = await Space.findOne({_id: spaceId});

      // Send
      reply.code(204).send(space);
  },
}
