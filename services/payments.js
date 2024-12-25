const { PaymentsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    PaymentsModel.findOne(filterQuery).select({ __v: 0 });
  },
  getOne: (filterQuery) => {
    return PaymentsModel.findOne(filterQuery).select({ __v: 0 });
  },
  create: (payload) => {
    return PaymentsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return PaymentsModel.updateOne({ filterQuery }, changes);
  },
};
