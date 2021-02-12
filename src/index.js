const refreshAll = require("./createdatabase");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const con = require("./connector");
const cors = require('cors');
refreshAll();
app.use(cors())
// free-slots?date=  GET
app.get("/api/events/:date", (req, res) => {
  const date = req.params.date;
  con.query(`SELECT * FROM events WHERE date BETWEEN '${date}T00:00:00.00' AND '${date}T23:59:59.999'`, (err, result, fields) => {
          if (err) { console.log("err" , err);res.status(404).json(err.message); } 
          else {
              res.status(200).json(result);
          }
      });
});

app.listen(port);
exports.app = app;
