const { MongoClient } = require("mongodb");
require("dotenv").config();

let _db;

const initDb = (callback) => {
  if (_db) return callback(null, _db);

  // AGREGAMOS ESTE LOG PARA DEPURAR
  console.log("URI leyendo:", process.env.MONGODB_URI);

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db("entrepreneurshipDB");
      callback(null, _db);
    })
    .catch((err) => callback(err));
};

const getDb = () => {
  if (!_db) throw Error("Database not initialized");
  return _db;
};

module.exports = { initDb, getDb };
