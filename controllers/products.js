const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const result = await getDb().collection("products").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener datos", error: err.message });
  }
};

const createProduct = async (req, res) => {
  // VALIDACIÓN: Si falta nombre o precio, rechazamos
  if (!req.body.name || !req.body.price || !req.body.sku) {
    return res
      .status(400)
      .json({ message: "Error: Falta nombre, precio o SKU." });
  }
  const product = { ...req.body };
  try {
    const response = await getDb().collection("products").insertOne(product);
    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Error al crear", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: "ID necesario" });
  const productId = new ObjectId(req.params.id);
  try {
    const response = await getDb()
      .collection("products")
      .replaceOne({ _id: productId }, req.body);
    if (response.matchedCount === 0)
      return res.status(404).json({ message: "No se encontró el producto" });
    res.status(204).send(); // 204 = Éxito sin contenido
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const response = await getDb()
      .collection("products")
      .deleteOne({ _id: productId });
    if (response.deletedCount === 0)
      return res.status(404).json({ message: "No se encontró" });
    res.status(200).json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, createProduct, updateProduct, deleteProduct };
