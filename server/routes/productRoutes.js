const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const upload = require('../middleware/upload');

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById, 
} = require('../controllers/productController');

router.post('/',upload.array('images', 5),  createProduct);
router.get('/featured', async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(5);
  res.json(products);
});
router.get('/', getAllProducts);
router.put('/:id',upload.array('images', 5), updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);

module.exports = router;
