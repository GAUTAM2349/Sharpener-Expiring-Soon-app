const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: false,
  },
  manufacturingDate: {
    type: Date,
    default: null,
  },
  category: {
    type: String,
    enum: ['Food', 'Grocery', 'Medicine', 'Cosmetics', 'Others'],
    required: true,
  },
  description: {
    type: String,
    default: '',
    required: false,
  },
  imageUrl: {
    type: String,
    default: null, 
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
