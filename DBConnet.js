const mongoose = require('mongoose');

const connectToDb = async (url) => {
  return mongoose.connect(url);
};

module.exports = connectToDb;
