const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  project: { type: String, required: true }, // project name
  timestamp: { type: Date, default: Date.now }, 
  level: { type: String, required: true },  // e.g., info, error, debug
  isDefault: { type: Boolean, default: false}, // check if it is a fake log
  message: { type: String, required: true },
  meta: { type: Object },                   // additional data
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;