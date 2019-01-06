const Update = require('../models/UpdateModel');

module.exports = {
  async getUpdateList(req, res, next) {
    // Init
    const { projectId } = req.params;

    // Act
    const updates = Update.find({projectId});

    // Send
    res.status(200).send({updates});
  },

  async getUpdate(req, res, next) {
    // Init
    const { updateId } = req.params;

    // Act
    const update = await Update.findOne({_id: id});

    // Send
    res.status(200).send(update);
  },

  async createUpdate(req, res, next) {
    // Init
    const {
      profileId,
      content,
    } = req.body;

    const { projectId } = req.params;

    const views = 0;

    // Act
    const update = await Update.create({profileId, projectId, content, views});

    // Send
    await update.save();
    res.status(201).send(update);
  },

  async deleteUpdate(req, res, next) {
    // Init
    const { updateId } = req.params;

    // Act
    await Update.findOneAndDelete({_id: updateId});
    const update = Update.findOne({_id: updateId});

    // Send
    res.status(204).send(update);
  },
}
