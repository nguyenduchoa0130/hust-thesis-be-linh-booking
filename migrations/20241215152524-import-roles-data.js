const roles = require('../migrations-data/roles.json');

module.exports = {
  async up(db, client) {
    return db.collection('roles').insertMany(roles);
  },

  async down(db, client) {},
};
