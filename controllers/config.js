// Dependencies

// Models
const Config = require('../models/ConfigModel');

module.exports = {
  async createConfig(req, res, next) {
    // Init
    const { name } = req.body;
    const { accessKeyId, secretAccessKey } = req.body.options;

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
    res.status(201).send(config);
  }
};
