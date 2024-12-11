const jwt = require('jsonwebtoken');

module.exports = {
  createAccessToken: (payload) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', {
      expiresIn: '2h',
    });
    return token;
  },

  createRefreshToken: (payload) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', {
      expiresIn: '3d',
    });
    return token;
  },
};
