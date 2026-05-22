const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Mi API de Inventario",
    description: "Documentación del Proyecto CRUD",
  },
  host: "inventario-api-ypaj.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/products.js"]; // Asegúrate que esta ruta apunte a tu archivo de rutas

swaggerAutogen(outputFile, endpointsFiles, doc);
