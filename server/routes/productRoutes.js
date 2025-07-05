const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById, 
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/featured', async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(6);
  res.json(products);
});
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);

module.exports = router;
