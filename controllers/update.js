// Dependencies

// Models
const Update = require('../models/update');

module.exports = {
  async getUpdateList(request, reply) {
    // Init
    const { projectId } = request.params;

    // Act
    const updates = await Update.find({ projectId });

    // Send
    reply.code(200).send({ updates });
  },

  async getUpdate(request, reply) {
    // Init
    const { updateId } = request.params;

    // Act
    const update = await Update.findOne({ _id: updateId });

    // Send
    reply.code(200).send(update);
  },

  async createUpdate(request, reply) {
    // Init
    const { profileId, content } = request.body;

    const { projectId } = request.params;

    const views = 0;

    // Act
    const update = await Update.create({ profileId, projectId, content, views });

    // Send
    await update.save();
    reply.code(201).send(update);
  },

  async deleteUpdate(request, reply) {
    // Init
    const { updateId } = request.params;

    // Act
    await Update.findOneAndDelete({ _id: updateId });
    const update = await Update.findOne({ _id: updateId });

    // Send
    reply.code(204).send(update);
  }
};
