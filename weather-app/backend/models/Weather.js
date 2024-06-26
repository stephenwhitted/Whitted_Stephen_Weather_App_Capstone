const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  state: String,
  uniqueWeatherId: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', weatherSchema);
