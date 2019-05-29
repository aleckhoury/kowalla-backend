// Dependencies
const request = require('superagent');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
// const request = require('request');
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
    async authTwitterUser(req, res, next) {
        const { options } = await Config.findOne({name: 'twitterKeys'});

        // Initialize
        const oauth = OAuth({
            consumer: {
                key: options.consumerApiKey,
                secret: options.consumerApiSecretKey
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });

        const request_data = {
            url: 'https://api.twitter.com/oauth/request_token',
            method: 'POST'
        };

        // Note: The token is optional for some requests
        const token = {
            key: options.accessToken,
            secret: options.accessTokenSecret
        };

        try {
            const accessBiz = await request
                .post('https://api.twitter.com/oauth/request_token')
                .type('form')
                .send(oauth.authorize(request_data, token));
            const values = accessBiz.res.text.split('&');
            const obj = {};
            await values.map(x => {
                const keyValue = x.split('=');
                obj[keyValue[0]] = keyValue[1];
            });
            return res.status(200).json(obj);
        } catch(err) {
            console.log(err);
        }
    },
    async verifyTwitterUser(req, res, next) {
        const { options } = await Config.findOne({name: 'twitterKeys'});

        const { oauthToken, verifier } = req.body;

        // Initialize
        const oauth = OAuth({
            consumer: {
                key: options.consumerApiKey,
                secret: options.consumerApiSecretKey
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });

        const request_data = {
            url: 'https://api.twitter.com/oauth/access_token',
            method: 'POST',
            data: { oauth_verifier: verifier }
        };

        // Note: The token is optional for some requests
        const token = {
            key: oauthToken,
        };

        try {
            const accessBiz = await request
                .post('https://api.twitter.com/oauth/access_token')
                .type('form')
                .send(oauth.authorize(request_data, token));
            const values = accessBiz.res.text.split('&');
            const obj = {};
            await values.map(x => {
                const keyValue = x.split('=');
                obj[keyValue[0]] = keyValue[1];
            });
            const token2 = {
                key: obj.oauth_token,
                secret: obj.oauth_token_secret,
            };
            const requestData2 = {
                url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
                method: 'GET',
                data: { skip_status: true }
            };
            const userInfo = await request
                .get('https://api.twitter.com/1.1/account/verify_credentials.json')
                .query(oauth.authorize(requestData2, token2))
                .then(async result => {
                    let user = await Profile.findOne({ username: result.body.screen_name })
                        .populate('postCount')
                        .populate('commentCount')
                        .exec();
                    if (!user) {
                        const newUser = await User.create({
                            username: result.body.screen_name,
                            password: '',
                        });
                        newUser.save();
                        user = await Profile.create({
                            firstName: result.body.name,
                            lastName: '',
                            username: result.body.screen_name,
                            description: result.body.description,
                            profilePicture: result.body.profile_image_url_https,
                            uiColor: result.body.profile_link_color,
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
                });
        } catch(err) {
            console.log(err);
        }
    }
};
