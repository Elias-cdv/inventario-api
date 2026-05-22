const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Mi API de Inventario",
    description: "Documentación del Proyecto CRUD",
  },
  host: "inventario-api-ypaj.onrender.com", // Tu host de Render
  schemes: ["https"],
  basePath: "/products", // <-- ¡CAMBIA ESTO A '/products'! Esto le mete el prefijo a todo.
};

const outputFile = "./swagger.json";

// AQUÍ EL SEGUNDO CAMBIO: En vez de leer la carpeta routes,
// haz que lea directamente desde app.js para que entienda el app.use('/products')
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
