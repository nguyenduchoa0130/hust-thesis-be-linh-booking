const { TokensModel } = require('../models');

module.exports = {
  getOne: (email) => {
    return TokensModel.findOne({ email });
  },
  create: (payload) => {
    return TokensModel.create(payload);
  },
  remove: (email) => {
    return TokensModel.deleteOne({ email });
  },
};
