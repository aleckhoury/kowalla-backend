// Dependencies
const request = require('superagent');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const Config = require('../models/ConfigModel');
const Profile = require('../models/ProfileModel');
const User = require('../models/UserModel');
let data;
// Models
module.exports = {
    async authGithubUser(req, res, next) {
        // Init
        const { code } = req.body;

        if (!code) {
            return res.send({
                success: false,
                message: 'Error no code'
            })
        }
        const { options } = await Config.findOne({name: 'githubKeys'});
        // Post
        try {
            await request
                .post('https://github.com/login/oauth/access_token')
                .send({
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    code })
                .set('Accept', 'application/json')
                .then(result => {
                    data = result.body;
                });
        } catch(err) {
            console.log(err);
        }
        await request
            .get('https://api.github.com/user')
            .set('Authorization', `token ${data.access_token}`)
            .then(async result => {
                let user = await Profile.findOne({ username: result.body.login })
                    .populate('postCount')
                    .populate('commentCount')
                    .exec();
                if (!user) {
                    const newUser = await User.create({
                        username: result.body.login,
                        password: '',
                    });
                    newUser.save();
                    user = await Profile.create({
                        firstName: result.body.login,
                        lastName: '',
                        username: result.body.login,
                        description: '',
                        profilePicture: result.body.avatar_url,
                    });
                    user.save();
                } else {
                    const token = await jwt.sign({ sub: user._id }, config.secret);
                    return res.status(200).json({
                            isNew: false,
                            token,
                            user
                    });
                }
                const token = await jwt.sign({ sub: user._id }, config.secret);
                return res.status(200).json({
                        isNew: true,
                        token,
                        user
                });
            })
        // Send
    },
};
