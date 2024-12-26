const { errorsUtil, jwtUtil } = require('../utils');

const AuthGuard = (roles, checkOwner) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(errorsUtil.createForbidden('Access denied. No token provided'));
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await jwtUtil.verifyToken(token);
      req.currentUser = decoded;
      const hasPermission = roles && roles.includes(req.currentUser?.role.name);
      const isOwner = checkOwner && req.currentUser?.id === req.params.id;
      if (!hasPermission && !isOwner) {
        return next(
          errorsUtil.createForbidden(
            'Access denied. You are not authorized to perform this action',
          ),
        );
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = AuthGuard;
