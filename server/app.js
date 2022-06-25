const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "egzaminas",
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/items-manager", (req, res) => {
  // SELECT column1, column2, ...
  // FROM table_name;
  const sql = `					
SELECT						
*						
FROM items					
`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
