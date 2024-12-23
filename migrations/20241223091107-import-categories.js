const categories = require('../migrations-data/categories.json');

module.exports = {
  async up(db, client) {
    return db.collection('tourcategories').insertMany(categories);
  },

  async down(db, client) {},
};
