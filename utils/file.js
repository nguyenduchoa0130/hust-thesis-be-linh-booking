const fs = require('fs');
const { logger } = require('.');
const fsUnlink = require('util').promisify(fs.unlink);

module.exports = {
  extract: (req, fieldName, isSingle) => {
    const files = req.files && req.files[fieldName]?.length ? req.files[fieldName] : [];
    return isSingle ? files[0] : files;
  },
  constructUrl: (req, fileName) => {
    return `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
  },
  removeFile: async (filePath) => {
    try {
      return await fsUnlink(filePath);
    } catch (error) {
      logger.error(error);
    }
  },
};
