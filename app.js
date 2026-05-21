require("dotenv").config();
const express = require("express");
const app = express();
const { initDb } = require("./db/connect");
const productRoutes = require("./routes/products"); // Importa tus rutas
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());

// Documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas reales
app.use("/products", productRoutes);

// Iniciar servidor
initDb((err) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Servidor corriendo en el puerto 8080");
    });
  }
});
