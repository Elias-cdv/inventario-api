const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Mi API de Inventario",
    description: "Documentación del Proyecto CRUD",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/products.js"]; // Asegúrate que esta ruta apunte a tu archivo de rutas

swaggerAutogen(outputFile, endpointsFiles, doc);
