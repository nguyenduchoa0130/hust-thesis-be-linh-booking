require('dotenv').config();
const path = require('path');
const multer = require('multer');
const { errorsUtil } = require('../utils');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// Filter to only allow image and video files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/*', 'video/*'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      errorsUtil.createBadRequest('Invalid file type. Only image and video files are allowed'),
      false,
    );
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * (parseInt(process.env.MAX_FILE_SIZE_IN_MB) || 5),
  },
});
