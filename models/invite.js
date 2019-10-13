const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const InviteSchema = new Schema(
    {
        _id: { type: String, default: shortid.generate },
        profileId: String,
        invitedProfileId: String,
    },
    {
        timestamps: true
    }
);

const Invite = mongoose.model('invite', InviteSchema);

module.exports = Invite;
