const { HotelsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return HotelsModel.find(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({ path: 'images', select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 } })
      .sort({ createdAt: 'desc' });
  },
  getById: (id) => {
    return HotelsModel.findById(id)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({ path: 'images', select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 } });
  },
  getImagesById: (id) => {
    return HotelsModel.findById(id).select({ images: 1, _id: 0 });
  },
  create: (payload) => {
    return HotelsModel.create(payload);
  },
  update: (id, payload) => {
    return HotelsModel.updateOne({ _id: id }, payload);
  },
  remove: (id) => {
    return HotelsModel.deleteOne({ _id: id });
  },
};
