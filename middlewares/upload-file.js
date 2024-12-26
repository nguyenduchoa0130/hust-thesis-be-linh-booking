require('dotenv').config();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { errorsUtil } = require('../utils');
const {
  images: allowedImageMimeTypes,
  videos: allowedVideoMimeTypes,
} = require('../configs/allowed-mime-types.json');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolderPath = path.join(__dirname, '../public/uploads/');
    fs.mkdirSync(uploadFolderPath, { recursive: true });
    cb(null, uploadFolderPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(8).toString('hex');
    cb(null, randomName + ext);
  },
});

// Filter to only allow image and video files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [...allowedImageMimeTypes, ...allowedVideoMimeTypes];
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
