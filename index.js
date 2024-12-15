// Inject libraries
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');

// Inject custom libraries
require('./models'); // Just declare to application aware about the models then mongoose will run synchronize database
const { logger, dbUtil } = require('./utils');
const { HttpStatusEnum } = require('./enums');
const { errorHandlerMiddleware } = require('./middlewares');

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
app.use('*', (req, res) => {
  return res.status(HttpStatusEnum.NotFound).json({
    status: 'Not found',
    statusCode: HttpStatusEnum.NotFound,
    message: `Can not find the api path: ${req.path}`,
  });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

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
