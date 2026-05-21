require("dotenv").config();
const productRoutes = require("./routes/products");
const express = require("express");
const app = express();
const { initDb } = require("./db/connect");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/products", productRoutes);

// Ruta básica para probar que conecta
app.use("/products", (req, res) => {
  res.json({ message: "Servidor conectado y funcionando" });
});

initDb((err) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Servidor corriendo en el puerto 8080");
    });
  }
});
