// Dependencies

// Models
const Space = require("../models/SpaceModel");
const Profile = require("../models/ProfileModel");

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

  for (let i = 0; i < usernames.length; i++) {
    let profileObj = await Profile.findOne({ username: usernames[i] });
    idArray.push(profileObj._id);
  }

  return idArray;
}

module.exports = {
  async getSpaceList(req, res, next) {
    // Init
    spaces = await Space.find({})
      .populate("subscribers")
      .populate("postCount")
      .exec();

    // Send
    res.send({ spaces });
  },

  async getSpaceByName(req, res, next) {
    // Init
    const { spaceName } = req.params;

    // Act
    const space = await Space.findOne({ name: spaceName })
      .populate("subscribers")
      .populate("postCount")
      .exec();

    // Send
    res.status(200).send(space);
  },

  async getSpace(req, res, next) {
    // Init
    const { spaceId } = req.params;

    // Act
    const space = await Space.findOne({ _id: spaceId })
      .populate("subscribers")
      .populate("postCount")
      .exec();

    // Send
    res.status(200).send(space);
  },

  async createSpace(req, res, next) {
    // Init
    let { name, description, headerPicture, profilePicture, admins } = req.body;

    if (profilePicture === "") {
      let items = ["bd56e1", "efbbcc", "0a2049", "db9dee"];
      let item = items[Math.floor(Math.random() * items.length)];
      profilePicture = `https://ui-avatars.com/api/?name=${name}&background=${item}&color=${item === "efbbcc" ? "0a2049" : "fff"}&bold=true&size=200&font-size=0.6`;
    }

    try {
      // Act
      const adminIds = await getProfileIdsFromUsernames(admins);
      const space = await Space.create({
        name,
        description,
        headerPicture,
        profilePicture,
        admins: adminIds
      });

      await space.save();

      // Send
      const populatedSpace = await Space.findOne({ _id: space._id })
        .populate("subscribers")
        .populate("postCount")
        .exec();

      res.status(201).send(populatedSpace);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async updateSpace(req, res, next) {
    // Init
    const { spaceId } = req.params;
    const updateParams = req.body;

    try {
      // Act
      await Space.findOneAndUpdate({ _id: spaceId }, updateParams, { runValidators: true, context: "query" });
      const space = await Space.findOne({ _id: spaceId })
        .populate("subscribers")
        .populate("postCount")
        .exec();

      // Send
      res.status(200).send(space);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async deleteSpace(req, res, next) {
    // Init
    const { spaceId } = req.params;

    // Act
    await Space.findOneAndDelete({ _id: spaceId });
    const space = await Space.findOne({ _id: spaceId });

    // Send
    res.status(204).send(space);
  }
};
