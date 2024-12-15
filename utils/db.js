require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    return mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  disconnect: () => {
    return mongoose.connection.close();
  },
};
