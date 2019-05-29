const multer = require('multer');
const express = require('express');
const path = require('path');
const ImageController = require('../controllers/image_controller');


module.exports = async (app) => {
    app.use('/static', express.static(path.join(__dirname, 'static')));

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
    app.post('/api/v1/bannerPicUpload', upload.single('file'), ImageController.uploadBannerPic);
    app.post('/api/v1/profilePicUpload', upload.single('file'), ImageController.uploadProfilePic);
    app.post('/api/v1/posts/imageUpload', upload.single('file'), ImageController.uploadPostImage);
    app.post('/api/v1/imageDelete', ImageController.deletePostImage);
};
