// Dependencies
const User = require('../models/UserModel');
const Profile = require('../models/ProfileModel');
const Subscription = require('../models/SubscriptionModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const Email = require('../helpers/email-helpers');

// Models

module.exports = {
    async createUser(req, res, next) {
        await bcrypt.hash(req.body.password, 10,async function(err, hash) {
                try {
                    let newUser = await User.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                    });
                    await newUser.save();
                    let profile = await Profile.create({
                        firstName: req.body.username,
                        lastName: '',
                        username: req.body.username,
                        description: '',
                        profilePicture: '',
                    });
                    const subscription = await Subscription.create({profileId: profile._id, communityId: 'fugmXEmwr'});
                    await profile.save();
                    await subscription.save();
                    const token = await jwt.sign({ sub: newUser._id }, config.secret);
                    const { _doc: { _id, username, password }, ...userWithoutPassword } = await newUser;
                    await Email.sendWelcomeEmail(req.body.username, req.body.email);
                    return res.status(200).json({
                        data: {
                            _id,
                            username,
                            token
                        }
                    });
                } catch(err) {
                    console.log(err);
                    return res.status(400).jsonp({
                        status: 'error',
                        message: 'This username or email is already taken.'
                    })
                }
        });
    },
     async authUser(req, res, next) {
        const globalRes = res;
        let user;
        console.log(req.body);
        if (req.body.usernameOrEmail.includes('@')) {
            user = await User.findOne({email: req.body.usernameOrEmail });
        } else {
            user = await User.findOne({username: req.body.usernameOrEmail });
        }
        if (!user) {
            return globalRes.status(400).jsonp({
                status: 'error',
                message: 'Invalid username'
            })
        }
        await bcrypt.compare(req.body.password, user.password,function(err, res) {
            if (res) {
                const token = jwt.sign({ sub: user._id }, config.secret);
                const { _doc: { _id, username, password }, ...userWithoutPassword } = user;
                return globalRes.status(200).json({
                    username,
                    token
                });
            } else {
                return globalRes.status(400).jsonp({
                    status: 'error',
                    message: 'Incorrect Password'
                })
            }
        });
    }
};
