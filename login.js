var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cookieParser =require('cookie-parser');

const bodyParser = require('body-parser');
router.use(cookieParser());

router.get('/',function(req,res){
console.log('Hey there');

res.sendFile('/Flighty/login.html',{root:__dirname});
});


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
 

 var username= req.body.uname;
 var password = req.body.pwd;
   if(username && password){
     connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,password], function(err,results,fields){
console.log(req.cookies.username);
      if(results.length>0){
           
              res.cookie('username',username,{maxAge: 900000, httpOnly:true});

    	   // res.write(req.cookies.username);
             res.redirect('http://13.232.244.43:8080/index');
      }
     
     else{
        res.send('Incorrect Username and/or Password!');
       }
       res.end();
     });
   }else{
     res.send('Please enter Username and/or Password!');
     res.end();
  }
connection.end();

});

module.exports= router;
