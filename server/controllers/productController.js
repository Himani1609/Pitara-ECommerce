const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, isFeatured } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.filename); 
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      categoryId,
      isFeatured,
      images,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    console.log('Received files:', req.files);
    console.log('Received body:', req.body);

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let updatedImages = product.images;

    // If new files uploaded, replace existing images
    if (req.files && req.files.length > 0) {
      updatedImages = req.files.map(file => file.filename);
    }

    const updateFields = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      images: updatedImages,
    };

    const updated = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.status(200).json(updated);
    
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
