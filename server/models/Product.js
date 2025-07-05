const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    stock: { type: Number, required: true },
    images: [{ type: String, required: true }],
    isFeatured: { type: Boolean, default: false },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
