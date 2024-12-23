const transports = require('../migrations-data/transports.json');

module.exports = {
  async up(db, client) {
    return db.collection('tourtransports').insertMany(transports);
  },

  async down(db, client) {},
};
