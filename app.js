const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { monogose } = require("./config/connect-database");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
