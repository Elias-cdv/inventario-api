require("dotenv").config();
const express = require("express");
const app = express();
const { initDb } = require("./db/connect");

app.use(express.json());

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
