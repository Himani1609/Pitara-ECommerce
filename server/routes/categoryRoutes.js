const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); 
const {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory
} = require('../controllers/categoryController');

router.post('/', upload.single('image'), createCategory);
router.put('/:id', upload.single('image'), updateCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);

module.exports = router;
