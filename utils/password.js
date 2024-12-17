require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  /**
   * Hash password
   * @param {string} password
   * @returns {Promise<string>}
   */
  hash: (password) => {
    return bcrypt.hash(password, process.env.PASSWORD_SALT || 10);
  },

  /**
   * Compare encryptedPassword with password
   * @param {string} encryptedPassword
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  isMatch: (encryptedPassword, password) => {
    return bcrypt.compare(password, encryptedPassword);
  },
};
