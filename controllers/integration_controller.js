// Dependencies

// Models
const Integration = require('../models/IntegrationModel');

module.exports = {
    async createIntegration(request, reply) {
        // Init
        const {
            name,
            description,
        } = request.body;
        // Act
        const integration = await Integration.create({ name, description });

        // Send
        await integration.save();
        reply.code(201).send(integration);
    },
    async getIntegrations(request, reply) {
        // Init
        try {
            // Act
            let integrations = await Integration.find({});
            if (integrations.length) {
                return reply.code(200).send(integrations);
            }
            return reply.code(204).send('No Integrations yet!');
        } catch(err) {
            return reply.code(500).send(err, 'An error occurred while fetching integrations');
        }
    }
};
