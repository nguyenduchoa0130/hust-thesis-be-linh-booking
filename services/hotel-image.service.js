const { HotelImagesModel } = require('../models');
const { errorsUtil, fileUtil } = require('../utils');

module.exports = {
  getListByIds: async (ids) => {
    return HotelImagesModel.find({ _id: { $in: ids } });
  },
  create: (payloads) => {
    return HotelImagesModel.insertMany(payloads);
  },
  remove: async (ids) => {
    const images = await HotelImagesModel.find({ _id: { $in: ids } });
    if (!images.length) {
      throw errorsUtil.createNotFound(`Can't find any images with id ${ids.join(', ')}`);
    }
    const removeFilePromises = images.map((img) => fileUtil.removeFile(img.path));
    const removeHotelImagePromise = HotelImagesModel.deleteMany({
      _id: { $in: images.map((img) => img._id) },
    });
    await Promise.all([removeFilePromises, removeHotelImagePromise]);
    return true;
  },
};
