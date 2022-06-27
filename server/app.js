const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
md5 = require("js-md5");
const uuid = require("uuid");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "egzaminai",
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books-manager", (req, res) => {
  // SELECT column1, column2, ...
  // FROM table_name;
  const sql = `
SELECT
*
FROM books
`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/books-list/all", (req, res) => {
  const sql = `
        SELECT
        *
        FROM books
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/books-list/:cat", (req, res) => {
  if (req.params.cat != "all") {
    const sql = `
            SELECT
            *
            FROM books
            WHERE type = ?
        `;
    con.query(
      sql,
      [["documentary", "animation", "drama"].indexOf(req.params.cat) + 1],
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  }
});

app.post("/books-manager", (req, res) => {
  console.log(req.body.name);
  // INSERT INTO table_name (column1, column2, column3, ...)
  // VALUES (value1, value2, value3, ...);
  const sql = `
         INSERT INTO books
         (title, author, description, photo, price, type)
         VALUES (?, ?, ?, ?, ?, ?)
      `;

  con.query(
    sql,
    [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.photo,
      req.body.price,
      req.body.type,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
      console.log(results);
    }
  );
});
// Route

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
