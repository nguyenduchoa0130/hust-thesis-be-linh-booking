const { UsersModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return UsersModel.find(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0, password: 0 })
      .populate({
        path: 'role',
        select: { __v: 0, createdAt: 0, updatedAt: 0, desc: 0 },
      });
  },
  getOne: (filterQuery) => {
    return UsersModel.findOne(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } });
  },
  getById: (id) => {
    return UsersModel.findById(id)
      .select({ __v: 0, createdAt: 0, updatedAt: 0, password: 0 })
      .populate({
        path: 'role',
        select: { __v: 0, createdAt: 0, updatedAt: 0, desc: 0 },
      });
  },
  create: (payload) => {
    return UsersModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return UsersModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return UsersModel.deleteOne(filterQuery);
  },
};
