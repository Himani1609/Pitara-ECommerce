const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : '';

    const category = new Category({
      name,
      description,
      image
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('Create category failed:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateFields = {
      name,
      description
    };

    if (image) updateFields.image = image;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('Update category failed:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
