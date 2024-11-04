const sqlite3 = require("sqlite3");

const DBSRC = "db.sqlite";

const db = new sqlite3.Database(DBSRC, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("SQLITE DB CONNECTED");
    db.run(
      `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)`,
      (err) => {
        if (err) {
          console.log("Table USERS already exists");
        }
      }
    );
    db.run(
      `CREATE TABLE hotel (id INTEGER PRIMARY KEY AUTOINCREMENT, local TEXT, url TEXT, status TEXT, preco INTEGER, stars INTEGER, quantidade INTEGER)`,
      (err) => {
        if (err) {
          console.log("Table HOTEL already exists");
        }
      }
    );
    db.run(
      `CREATE TABLE reservas (id INTEGER PRIMARY KEY AUTOINCREMENT idUser TEXT, idHotel TEXT, date TEXT, FOREIGN KEY (idUser) REFERENCES users(id), FOREIGN KEY (idHotel) REFERENCES hotel(id))`,
      (err) => {
        if (err) {
          console.log("Table RESERVAS already exists");
        }
      }
    );
  }
});

module.exports = db;
