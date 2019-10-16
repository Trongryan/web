const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const GoogleSpreadsheet = require("google-spreadsheet");
const async = require("async");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// google sheets api
let doc = new GoogleSpreadsheet("1sy8aOw6Mg5ASr-wXlXxr9u7_FpeIkRGjWIish_hfe1U");
async.series(
  [
    function setAuth(step) {
      // see notes below for authentication instructions!
      var creds = require("./google-generated-creds.json");
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log("Loaded doc: " + info.title + " by " + info.author.email);
      });
    }
  ],
  function(err) {
    if (err) {
      console.log("Error: " + err);
    }
  }
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);
app.get("/send", (req, res) => {
  let data = { Name: "Trs", month: "October" };
  doc.addRow(1, data, function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.send("done");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
