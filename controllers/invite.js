// Dependencies

// Models
const Invite = require('../models/invite');

module.exports = {

async createInvite(request, reply) {
    // Init
    const {
        // these need to be null'd if they're not being used
        profileId
    } = request.params;

    const { invitedProfileId } = request.body;

    if (invitedProfileId !== undefined) {
        // Act
        const invite = await Invite.create({ profileId, invitedProfileId });

        // Send
        await invite.save();
        reply.code(201).send(invite);
    }
},
};
