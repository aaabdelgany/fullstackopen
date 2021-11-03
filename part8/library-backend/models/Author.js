const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: String,
    default: '----',
  },
  bookCount: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('Author', schema);
