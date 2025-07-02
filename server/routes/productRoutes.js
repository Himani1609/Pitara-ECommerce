const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/productController');

// Products
router.post('/', createProduct);
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Categories
router.post('/category', createCategory);
router.get('/category/all', getAllCategories);
router.put('/category/:id', updateCategory);     
router.delete('/category/:id', deleteCategory);   


module.exports = router;
