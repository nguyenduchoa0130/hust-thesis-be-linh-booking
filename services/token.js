const { TokensModel } = require('../models');

module.exports = {
  create: (payload) => {
    return TokensModel.create(payload);
  },
  remove: (email) => {
    return TokensModel.deleteOne({ email });
  },
};
