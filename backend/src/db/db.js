const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connect to MongoDB.
 * Returns a Promise that resolves when connected or rejects on error.
 */
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database.');
  } catch (err) {
    console.error(`Some error occured while connecting to database: ${err}`);
    throw err;
  }
};

module.exports = connection;