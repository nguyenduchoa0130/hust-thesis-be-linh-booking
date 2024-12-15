const { logger } = require('../utils');
const { RolesModel } = require('../models');
const rolesMigration = require('./../migrations-data/roles.json');
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  try {
    await RolesModel.insertMany(rolesMigration);
  } catch (error) {
    console.log(error);
    logger.error('Failed to insert many roles, error: ', JSON.stringify(error));
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
  try {
    await RolesModel.deleteMany({});
  } catch (error) {
    logger.error('Failed to revert roles document, error: ', JSON.stringify(error));
  }
}

module.exports = { up, down };
