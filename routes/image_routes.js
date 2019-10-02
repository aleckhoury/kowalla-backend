const multer = require('fastify-multer');
const ImageController = require('../controllers/image_controller');

module.exports = app => {
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Wrong file type');
      error.code = 'LIMIT_FILE_TYPES';
      return cb(error, false);
    }
    cb(null, true);
  };

  const MAX_SIZE = 10000000;
  const upload = multer({
    dest: './uploads/',
    fileFilter,
    limits: {
      fileSize: MAX_SIZE
    }
  });

  app.route({ method: 'POST', url: '/bannerPicUpload', preHandler: upload.single('file'), handler: ImageController.uploadBannerPic });
  app.route({ method: 'POST', url: '/profilePicUpload', preHandler: upload.single('file'), handler: ImageController.uploadProfilePic });
  app.route({ method: 'POST', url: '/posts/imageUpload', preHandler: upload.single('file'), handler: ImageController.uploadPostImage });
  app.post('/imageDelete', ImageController.deletePostImage);
};
