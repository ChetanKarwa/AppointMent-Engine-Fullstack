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
app.get("/api/names", (req, res) => {
    con.query(`SELECT * FROM user`, (err, result, fields) => {
            if (err) { console.log("err" , err);res.status(404).json(err.message); } 
            else {
                res.status(200).json(result);
            }
        });
  });
  app.post("/api/names", (req, res) => {
      const name = req.body.name;
      con.query(`SELECT name from user WHERE name = '${name}'`, (err,result)=>{
        if (err) { res.status(404).json(err.message);} 
        else {
            if(result.length === 0)
            {
                con.query(`INSERT INTO user (name) VALUES ('${name}')`, (err, result, fields) => {
                    if (err) { console.log("err" , err);res.status(404).json(err.message); } 
                    else {
                        res.status(200).json({"msg" : "name added"});
                    }
                });
            }
            else
            {
                res.status(200).json({"msg" : "name already present"});
            }
        }
      })    
  });
app.post("/api/events/:date", (req, res) => {
    const slots = req.body.slots;
    const date = req.params.date;
    con.query(`SELECT * FROM events WHERE date BETWEEN '${date}T00:00:00.00' AND '${date}T23:59:59.999'`, (err, result, fields) => {
        if (err) { res.status(404).json(err.message); } 
        else {
            if(result.length===0)
            {
                con.query("INSERT INTO events (date,slot1,slot2,slot3,slot4,slot5,slot6,slot7,slot8,slot9,slot10,slot11,slot12,slot13,slot14) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [date].concat(slots), (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else{
                        res.status(200).json({ msg: "Slot Booked"});
                    }
                })
            }
            else
            {
                con.query(`UPDATE events SET slot1=?,slot2=?,slot3=?,slot4=?,slot5=?,slot6=?,slot7=?,slot8=?,slot9=?,slot10=?,slot11=?,slot12=?,slot13=?,slot14=? WHERE date BETWEEN '${date}T00:00:00.00' AND '${date}T23:59:59.999'`, slots, (err, result, fields) => {
                    if (err) { res.status(404).json(err.message); } 
                    else {
                        res.status(200).json({ msg: "Slot Booked"});
                    }
                });
            }
        }
    });
});
app.get("/api/events", (req, res) => {
    const date = req.params.date;
    con.query(`SELECT * FROM events`, (err, result, fields) => {
            if (err) { console.log("err" , err);res.status(404).json(err.message); } 
            else {
                res.status(200).json(result);
            }
        });
  });

app.listen(port);
exports.app = app;
