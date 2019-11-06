var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var cookieParser = require('cookie-parser');
var fs = require('fs');

var bodyParser = require('body-parser');
router.use(cookieParser());



router.post('/',function(req,res){


console.log(req.body);
console.log('Hey Booked');


fs.readFile("./Flighty/invoice.html",function(err,content)
  { res.end(content)});

});


module.exports=router;
