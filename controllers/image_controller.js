const sharp = require('sharp');
const fs = require('fs');
const aws = require('aws-sdk');
const Config = require('../models/ConfigModel');


module.exports = {
async uploadProfilePic(req, res, next) {
    const { options } = await Config.findOne({name: 'awsKeys'});
    aws.config.update(options);
    const s3 = new aws.S3();
    const now = Date.now();
    try {
        const buffer = await sharp(req.file.path)
            .resize({
                width: 180,
                height: 180,
                fit: 'cover',
                background: 'white',
            })
            .toBuffer();

        const s3res = await s3.upload({
            Bucket: `kowalla-dev/${req.body.picType}/profile-pics`,
            Key: `${now}-${req.file.originalname}`,
            Body: buffer,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
        }).promise();

        fs.unlink(req.file.path, () => {
            res.json({ file: s3res.Location })
        })
    } catch(err) {
    res.status(500).send(err);
    }
},
async uploadBannerPic(req, res, next) {
    const { options } = await Config.findOne({name: 'awsKeys'});
    aws.config.update(options);
    const s3 = new aws.S3();
    const now = Date.now();
    try {
        const buffer = await sharp(req.file.path)
            .resize({
                width: 1000,
                height: 300,
                fit: 'cover',
                background: 'transparent',
            })
            .toBuffer();

        const s3res = await s3.upload({
            Bucket: `kowalla-dev/${req.body.picType}/banner-pics`,
            Key: `${now}-${req.file.originalname}`,
            Body: buffer,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
        }).promise();

        fs.unlink(req.file.path, () => {
            res.json({ file: s3res.Location })
        })
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
},
async uploadPostImage(req, res, next) {
    const { options } = await Config.findOne({name: 'awsKeys'});
    aws.config.update(options);
    const s3 = new aws.S3();
    const now = Date.now();
    try {
        const buffer = await sharp(req.file.path)
            .resize(500, null, {
                fit: 'contain',
                position: 'centre',
                background: 'white',
            })
            .toBuffer();

        const s3res = await s3.upload({
            Bucket: `kowalla-dev/${req.body.type}/post-pics`,
            Key: `${now}-${req.file.originalname}`,
            Body: buffer,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
        }).promise();

        fs.unlink(req.file.path, () => {
            res.json({ file: s3res.Location })
        })
    } catch(err) {
        res.json({ err });
    }
},
    async deletePostImage(req, res, next) {
    const { options } = await Config.findOne({name: 'awsKeys'});
    aws.config.update(options);    const s3 = new aws.S3();
    const {bucket, fileName} = await req.body;

    try {
        const params = {Bucket: bucket, Key: fileName};
        await s3.deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack);  // error
            else res.status(201).send('Successfully deleted reaction');      // deleted
        });
    } catch (err) {
        res.json({err});
    }
},
};
