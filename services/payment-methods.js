const { PaymentMethodsModel } = require('../models');

module.exports = {
  getAll: () => {
    return PaymentMethodsModel.find().select({ __: 0, createdAt: 0, updatedAt: 0 });
  },
  getOne: (filterQuery) => {
    return PaymentMethodsModel.findOne(filterQuery).select({ __: 0, createdAt: 0, updatedAt: 0 });
  },
};
