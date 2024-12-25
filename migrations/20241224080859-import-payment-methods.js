const paymentMethods = require('../migrations-data/payment-methods.json');

module.exports = {
  async up(db, client) {
    return db.collection('paymentmethods').insertMany(paymentMethods);
  },

  async down(db, client) {},
};
