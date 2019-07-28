// Dependencies

// Models
const Integration = require('../models/IntegrationModel');

module.exports = {
    async createIntegration(req, res, next) {
        // Init
        const {
            name,
            description,
        } = req.body;
        // Act
        const integration = await Integration.create({ name, description });

        // Send
        await integration.save();
        res.status(201).send(integration);
    },
    async getIntegrations(req, res, next) {
        // Init
        try {
            // Act
            let integrations = await Integration.find({});
            if (integrations.length) {
                return res.status(200).send(integrations);
            }
            return res.status(204).send('No Integrations yet!');
        } catch(err) {
            return res.status(500).send(err, 'An error occurred while fetching integrations');
        }
    }
};
