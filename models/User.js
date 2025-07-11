const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  pushSubscription: {
    type: Object,   
    default: null
  }

}, { timestamps: true }); // You might want to enable timestamps

module.exports = mongoose.model('User', userSchema);
