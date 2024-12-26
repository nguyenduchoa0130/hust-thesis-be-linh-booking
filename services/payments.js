const { PaymentsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return PaymentsModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({ path: 'paymentMethod', select: { __id: 1, name: 1, icon: 1 } })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return PaymentsModel.findOne(filterQuery)
      .select({ __v: 0 })
      .populate({ path: 'paymentMethod', select: { __id: 1, name: 1, icon: 1 } });
  },
  create: (payload) => {
    return PaymentsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return PaymentsModel.updateOne(filterQuery, changes);
  },
};
