const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

// GET ALL PRODUCTS
const getAll = async (req, res) => {
  try {
    const result = await getDb().collection("products").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error retrieving data from database",
        error: err.message,
      });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product data to create',
        required: true,
        schema: {
          name: 'Iced Lemon Tea',
          description: 'Refreshing natural lemonade tea',
          price: 1.25,
          cost: 0.4,
          stock: 50,
          category: 'Beverage',
          sku: 'LEM-TEA-01',
          expirationDate: '2026-06-15'
        }
  } */

  const {
    name,
    description,
    price,
    cost,
    stock,
    category,
    sku,
    expirationDate,
  } = req.body;

  // Strict validation for all required fields
  if (
    !name ||
    !description ||
    price === undefined ||
    cost === undefined ||
    stock === undefined ||
    !category ||
    !sku ||
    !expirationDate
  ) {
    return res.status(400).json({
      message:
        "Validation failed. Missing required fields: name, description, price, cost, stock, category, sku, expirationDate.",
    });
  }

  const product = {
    name,
    description,
    price: Number(price),
    cost: Number(cost),
    stock: Number(stock),
    category,
    sku,
    expirationDate,
  };

  try {
    const response = await getDb().collection("products").insertOne(product);
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};

// UPDATE PRODUCT (PUT)
const updateProduct = async (req, res) => {
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product data to update',
        required: true,
        schema: {
          name: 'Iced Lemon Tea',
          description: 'Refreshing natural lemonade tea',
          price: 1.50,
          cost: 0.4,
          stock: 45,
          category: 'Beverage',
          sku: 'LEM-TEA-01',
          expirationDate: '2026-06-15'
        }
  } */

  if (!req.params.id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const productId = new ObjectId(req.params.id);
    const {
      name,
      description,
      price,
      cost,
      stock,
      category,
      sku,
      expirationDate,
    } = req.body;

    // Strict validation to prevent overwriting documents with empty data
    if (
      !name ||
      !description ||
      price === undefined ||
      cost === undefined ||
      stock === undefined ||
      !category ||
      !sku ||
      !expirationDate
    ) {
      return res.status(400).json({
        message:
          "Validation failed. All fields are required for updates: name, description, price, cost, stock, category, sku, expirationDate.",
      });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      cost: Number(cost),
      stock: Number(stock),
      category,
      sku,
      expirationDate,
    };

    const response = await getDb()
      .collection("products")
      .replaceOne({ _id: productId }, productData);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const response = await getDb()
      .collection("products")
      .deleteOne({ _id: productId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, createProduct, updateProduct, deleteProduct };
