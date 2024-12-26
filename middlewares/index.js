module.exports = {
  ValidationPayloadMiddleware: require('./validation-payload'),
  ErrorHandlerMiddleware: require('./errors-handler'),
  UploadFileMiddleware: require('./upload-file'),
  AuthGuard: require('./auth-guard'),
};
