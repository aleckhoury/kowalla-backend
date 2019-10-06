// Dependencies

// Models
const Config = require('../models/config');

module.exports = {
  async createConfig(request, reply) {
    // Init
    const { name } = request.body;
    const { accessKeyId, secretAccessKey } = request.body.options;

    // Act
    const config = await Config.create({
      name,
      options: {
        accessKeyId,
        secretAccessKey
      }
    });

    // Send
    await config.save();
    reply.code(201).send(config);
  }
};
