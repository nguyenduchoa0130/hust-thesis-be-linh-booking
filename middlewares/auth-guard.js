const { errorsUtil, jwtUtil } = require('../utils');

// Ensure you have your secret key in the config
const AuthGuard = (roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(errorsUtil.createForbidden('Access denied. No token provided'));
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await jwtUtil.verifyToken(token);
      req.currentUser = decoded;
      if (roles && !roles.includes(req.currentUser?.role.name)) {
        return next(errorsUtil.createForbidden('Access denied. You do not have the required role'));
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = AuthGuard;
