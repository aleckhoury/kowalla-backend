const sharp = require('sharp');
const fs = require('fs');
const aws = require('aws-sdk');
const Config = require('../models/config');

module.exports = {
  async uploadProfilePic(request, reply) {
    const { options } = await Config.findOne({ name: 'awsKeys' });
    aws.config.update(options);
    const s3 = new aws.S3();
    const now = Date.now();
    try {
      const buffer = await sharp(request.file.path)
        .resize({
          width: 180,
          height: 180,
          fit: 'cover',
          background: 'white'
        })
        .toBuffer();

      const s3res = await s3
        .upload({
          Bucket: `kowalla-dev/${request.body.picType}/profile-pics`,
          Key: `${now}-${request.file.originalname}`,
          Body: buffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read'
        })
        .promise();

      fs.unlink(request.file.path, () => {
        reply.send({ file: s3res.Location });
      });
    } catch (err) {
      reply.code(500).send(err);
    }
  },
  async uploadBannerPic(request, reply) {
    const { options } = await Config.findOne({ name: 'awsKeys' });
    aws.config.update(options);
    const s3 = new aws.S3();
    const now = Date.now();
    try {
      const buffer = await sharp(request.file.path)
        .resize({
          width: 1000,
          height: 300,
          fit: 'cover',
          background: 'transparent'
        })
        .toBuffer();

      const s3res = await s3
        .upload({
          Bucket: `kowalla-dev/${request.body.picType}/banner-pics`,
          Key: `${now}-${request.file.originalname}`,
          Body: buffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read'
        })
        .promise();

      fs.unlink(request.file.path, () => {
        reply.send({ file: s3res.Location });
      });
    } catch (err) {
      console.log(err);
      reply.code(500).send(err);
    }
  },
  async uploadPostImage(request, reply) {
    const { options } = await Config.findOne({ name: 'awsKeys' });
    aws.config.update(options);
    const s3 = new aws.S3();
    const now = Date.now();
    try {
      const buffer = await sharp(request.file.path)
        .resize(500, null, {
          fit: 'contain',
          position: 'centre',
          background: 'white'
        })
        .toBuffer();

      const s3res = await s3
        .upload({
          Bucket: `kowalla-dev/${request.body.type}/post-pics`,
          Key: `${now}`,
          Body: buffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read'
        })
        .promise();

      fs.unlink(request.file.path, () => {
        reply.send({ file: s3res.Location });
      });
    } catch (err) {
      reply.send({ err });
    }
  },
  async deletePostImage(request, reply) {
    const { options } = await Config.findOne({ name: 'awsKeys' });
    aws.config.update(options);
    const s3 = new aws.S3();
    const { bucket, fileName } = await request.body;

    try {
      const params = { Bucket: bucket, Key: fileName };
      await s3.deleteObject(params, (err, data) => {
        if (err) console.log(err, err.stack);
        // error
        else reply.code(201).send('Successfully deleted image'); // deleted
      });
    } catch (err) {
      reply.send({ err });
    }
  }
};
