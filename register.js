var express = require('express');
var mysql = require('mysql');
var router=express.Router();
var cookieParser = require('cookie-parser');
var fs= require('fs');

const bodyParser = require('body-parser');
router.use(cookieParser());


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



var flightno = req.body.flightno;
console.log(flightno);

console.log("Register Here");


var sql = "select * from flight where flightno=?"
connection.query(sql,[flightno],function(err,result){
if(err) throw err;
else
{
console.log("Here you go");
console.log(result);
}

     res.writeHead(200, {
   'Content-Type': 'text/html'});



res.write(result[0].flightno);
res.write('<br>');
res.write(result[0].flightname);


fs.readFile("Flighty/register.html",function(err,content)
  { res.end(content)});

//res.end();

connection.end();

});

});


module.exports = router;
