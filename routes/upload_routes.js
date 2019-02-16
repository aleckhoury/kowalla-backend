const multer = require('multer');
const express = require('express');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');

module.exports = (app) => {
    app.use('/static', express.static(path.join(__dirname, 'static')));

    aws.config.update({
        accessKeyId: 'AKIAITK7CNILZWWFVOWA',
        secretAccessKey: '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'
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Wrong file type');
            error.code = "LIMIT_FILE_TYPES";
            return cb(error, false);
        }
        cb(null, true)
    };

    const MAX_SIZE = 10000000;
    const upload = multer({
        dest: './uploads/',
        fileFilter,
        limits: {
            fileSize: MAX_SIZE,
        }
    });

    app.use((err, req, res, next) => {
        if (err.code ==='LIMIT_FILE_TYPES') {
            res.status(422).json({ error: 'Only images are allowed' });
        } else if (err.code ==='LIMIT_FILE_SIZE') {
            res.status(422).json({ error: `File size too large. Max size is ${MAX_SIZE/1000}KB` });
        }
    });

    app.post('/api/v1/posts/imageUpload', upload.single('file'), async (req, res, next) => {
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
                Bucket: 'kowalla-dev/user/post-pics',
                Key: `${now}-${req.file.originalname}`,
                Body: buffer,
                ACL: 'public-read'
            }).promise();

            fs.unlink(req.file.path, () => {
                res.json({ file: s3res.Location })
            })
        } catch(err) {
            res.json({ err });
        }
    })
    app.post('/api/v1/posts/imageDelete', async (req, res, next) => {
        const s3 = new aws.S3();
        const { bucket, fileName } = await req.body;

        try {
            const params = {  Bucket: bucket, Key: fileName };
            await s3.deleteObject(params, (err, data) => {
                if (err) console.log(err, err.stack);  // error
                else     console.log('Success!');      // deleted
            });
        } catch(err) {
            res.json({ err });
        }
    })
};
