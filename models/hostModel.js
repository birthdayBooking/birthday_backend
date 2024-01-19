const mongoose = require('mongoose');
const validator = require('validator');
const hostSchema = new mongoose.Schema({
{},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
});

const Host = mongoose.model('Host', hostSchema);
module.exports = Host;