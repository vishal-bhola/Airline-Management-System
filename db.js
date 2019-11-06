var express = require('express');
var mysql = require('mysql');
var router=express.Router();


const bodyParser = require('body-parser');

router.post('/',function(req,res){

var connection = mysql.createConnection({
host:'localhost',
user:'root',
password: 'vishal',
database: 'airline'
});




connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});




var sql = "insert into flight values('"+req.body.flightno+"','"+req.body.flightname+"','"+req.body.startpoint+"','"+req.body.destpoint+"','"+req.body.arrivaltime+"','"+req.body.depttime+"','"+req.body.economicfare+"','"+req.body.businessfare+"')"
console.log(req.body);
connection.query(sql, function (err, result) {
    if (err) throw err;
else{
console.log("Inserted");
    res.send("1 record inserted");
    }

connection.end();
});

connection.end();
});

module.exports=router;


