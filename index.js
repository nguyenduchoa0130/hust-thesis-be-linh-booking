// Inject libraries
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');

// Inject custom libraries
require('./models'); // Just declare to application aware about the models then mongoose will run synchronize database
const { logger, dbUtil } = require('./utils');
const { HttpStatusCodeEnum } = require('./enums');
const { ErrorHandlerMiddleware } = require('./middlewares');

// Init configurations
const app = express();
const PORT = process.env.PORT || 8080;

// Mount middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Mount routes
app.use('/api/auth', require('./apis/auth'));
app.use('/api/roles', require('./apis/roles'));
app.use('/api/tours', require('./apis/tours'));
app.use('/api/hotels', require('./apis/hotels'));
app.use('/api/tour-categories', require('./apis/tour-categories'));
app.use('/api/tour-destinations', require('./apis/tour-destinations'));
app.use('*', (req, res) => {
  return res.status(HttpStatusCodeEnum.NotFound).json({
    status: 'Not found',
    statusCode: HttpStatusCodeEnum.NotFound,
    message: `Can not find the api path: ${req.path}`,
  });
});

// Error handling middleware
app.use(ErrorHandlerMiddleware);

// Connect to mongodb and start the server
(async () => {
  try {
    logger.info('Connecting to mongodb database...');
    await dbUtil.connect();
    logger.info('Connected database successfully');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to connect to mongodb database', error);
    process.exit(1);
  }
})();
