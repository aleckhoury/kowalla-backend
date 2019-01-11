// Dependencies
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

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
                    const token = await jwt.sign({ sub: newUser._id }, config.secret);
                    const { _doc: { _id, username, password }, ...userWithoutPassword } = await newUser;
                    return res.status(200).json({
                        _id,
                        username,
                        token
                    });
                } catch {
                    return res.status(400).json({
                        status: 'error',
                        message: 'There was some kind of error, my dude.'
                    })
                }
        });
    },
     async authUser(req, res, next) {
        const globalRes = res;

        const user = await User.findOne({username: req.body.username});
        await bcrypt.compare(req.body.password, user.password,function(err, res) {
            if (res) {
                const token = jwt.sign({ sub: user._id }, config.secret);
                const { _doc: { _id, username, password }, ...userWithoutPassword } = user;
                return globalRes.status(200).json({
                    _id,
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
