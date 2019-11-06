var express = require('express');
var mysql = require('mysql');
var router=express.Router();
var cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
router.use(cookieParser());



router.post('/',function(req,res){

var connection = mysql.createConnection({
host:'localhost',
user:'root',
password: 'vishal',
database: 'airline'
});


//res.cookie('username','Vishal',{maxAge: 900000, httpOnly:true});
//return res.send('Cookie has been set');


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


var uid = Math.random()* (10000 -1000)+1000; 

var sql = "insert into users values('"+uid+"','"+req.body.uname+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.phno+"')"


console.log(req.body);
connection.query(sql, function (err, result) {
    if (err) throw err;
else{
console.log(req.cookie);
    console.log("1 record inserted");
        console.log(result);
       res.redirect('/index');
}

connection.end();
});
});

module.exports=router;
