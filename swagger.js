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
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
