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

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/admin")) {
    const sql = `
        SELECT
        name
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
app.use(doAuth);

// Route

app.get("/admin/hello", (req, res) => {
  res.send("Hello Admin!");
});

app.get("/login-check", (req, res) => {
  const sql = `
    SELECT
    name
    FROM users
    WHERE session = ?
    `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error" });
    } else {
      res.send({ msg: "ok" });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

app.get("/admin/books-manager", (req, res) => {
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
         (title, author, description, photo, type)
         VALUES (?, ?, ?, ?, ?)
      `;

  con.query(
    sql,
    [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.photo,
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

// DELETE FROM table_name
// WHERE some_column = some_value
app.delete("/books-manager/:id", (req, res) => {
  const sql = `
        DELETE FROM books
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put("/books-manager/:id", (req, res) => {
  console.log(req.body);
  let sql;
  let args;
  if ("" === req.body.photo && req.body.del == 0) {
    sql = `
        UPDATE books
        SET title = ?, author = ?, description = ?, type = ?
        WHERE id = ?
    `;
    args = [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.type,
      req.params.id,
    ];
  } else if (1 == req.body.del) {
    sql = `
        UPDATE books
        SET title = ?,  author = ?, description = ?, photo = NULL, type = ?
        WHERE id = ?
    `;
    args = [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.photo,
      req.body.type,
      req.params.id,
    ];
  } else {
    sql = `
      UPDATE books
      SET title = ?, author = ?, description = ?, photo = ?, type = ?
      WHERE id = ?
  `;
    args = [
      req.body.title,
      req.body.author,
      req.body.description,
      req.body.photo,
      req.body.type,
      req.params.id,
    ];
  }
  con.query(sql, args, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/books-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM books
        WHERE title LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Route

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
