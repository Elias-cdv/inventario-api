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

  try {
    const productId = new ObjectId(req.params.id);

    // 1. Clonamos el cuerpo de la petición
    const productData = { ...req.body };

    // 2. ¡EL TRUCO EXTRA! Borramos el _id si es que viene metido en el body de Swagger
    delete productData._id;

    // 3. Ejecutamos el reemplazo con el objeto limpio
    const response = await getDb()
      .collection("products")
      .replaceOne({ _id: productId }, productData);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "No se encontró el producto" });
    }

    res.status(204).send(); // Éxito sin contenido
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
