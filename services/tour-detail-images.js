const { TourDetailImagesModel } = require('../models');
const { errorsUtil, fileUtil } = require('../utils');

module.exports = {
  create: (payloads) => {
    return TourDetailImagesModel.insertMany(payloads);
  },
  remove: async (ids) => {
    const images = await TourDetailImagesModel.find({ _id: { $in: ids } });
    if (images.length) {
      const removeFilePromises = images.map((img) => fileUtil.removeFile(img.path));
      const removeImagePromise = TourDetailImagesModel.deleteMany({
        _id: { $in: images.map((img) => img._id) },
      });
      await Promise.all([removeFilePromises, removeImagePromise]);
    }
    return true;
  },
};
