const Product = require("../models/Product");


const createProduct = async (req, res) => {
  try {
    const {
      name,
      expiry,
      purchaseDate,
      manufacturingDate,
      category,
      description,
    } = req.body;

    console.log("yes it reached inside controller");
    

    if (!name || !expiry || !purchaseDate || !category) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const newProduct = new Product({
      name,
      expiry: new Date(expiry),
      purchaseDate: new Date(purchaseDate),
      manufacturingDate: manufacturingDate ? new Date(manufacturingDate) : null,
      category:category.toLowerCase(),
      description: description || '',
      userId : req.user._id,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUpcomingExpiries = async (req, res) => {
  try {
    const {
      category = "all",
      sortBy = "expiry",
      page = 1,
    } = req.query;

    const ITEMS_PER_PAGE = 10;
    const skip = (parseInt(page) - 1) * ITEMS_PER_PAGE;

    const filter = { userId: req.user._id };
    if (category !== "all") {
      filter.category = category.toLowerCase();
    }

    const sortField = sortBy === "last-modified" ? "updatedAt" : "expiry";
    const sortOrder = sortBy === "expiry" ? 1 : -1;
    const sortOptions = { [sortField]: sortOrder };

    // 🔍 Total count for pagination
    const totalItems = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // 📦 Fetch paginated data 
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .exec();

    // ✅ Send pagination info
    res.status(200).json({
      products,
      currentPage: parseInt(page),
      totalPages,
      totalItems,
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const product = await Product.findOne({ _id: id, userId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const {
      name,
      expiry,
      purchaseDate,
      manufacturingDate,
      category,
      description,
    } = req.body;

    const updates = {
      name,
      expiry: new Date(expiry),
      purchaseDate: new Date(purchaseDate),
      manufacturingDate: manufacturingDate ? new Date(manufacturingDate) : null,
      category,
      description: description || '',
    };

    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createProduct, deleteProduct, updateProduct, getUpcomingExpiries };
