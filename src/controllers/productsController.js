const Product = require('../models/product');

// Obtener todos los productos
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ data: products, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener los documentos de Productos:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener los documentos de Productos: ${error}` });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ data: null, success: false, error: `No se encontró el producto con el ID ${productId}` });
    }
    res.json({ data: product, error: null, success: true });
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ data: null, success: false, error: `Error al obtener el producto por ID: ${error}` });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ data: savedProduct, error: null, success: true });
  } catch (error) {
    console.error("Error al crear un nuevo producto:", error);
    res.status(500).json({ data: null, success: false, error: `Error al crear un nuevo producto: ${error}` });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json({ data: updatedProduct, error: null, success: true });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ data: null, success: false, error: `Error al actualizar el producto: ${error}` });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.json({ data: null, error: null, success: true });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ data: null, success: false, error: `Error al eliminar el producto: ${error}` });
  }
};


module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
};
