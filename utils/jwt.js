const errorsUtil = require('./errors');
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

  verifyToken: (payload) => {
    try {
      return jwt.verify(payload, process.env.TOKEN_SECRET || 'token_secret');
    } catch (err) {
      switch (err.code) {
        case 'TokenExpiredError':
          throw errorsUtil.createUnauthorized('Your token has expired');
        case 'JsonWebTokenError':
          throw errorsUtil.createForbidden('Invalid or malformed token');
        default:
          throw errorsUtil.createInternalServerError(
            'An error occurred while verifying your token',
          );
      }
    }
  },
};
