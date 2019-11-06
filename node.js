var db= require('./db');
//var form = require('./form');
var login = require('./login');
var signup = require('./signup');
var about = require('./about');
var express=require('express');
var morgan =require('morgan');
var fs= require('fs');
var cookieParser = require('cookie-parser');
var register = require('./register');
var index = require('./index');
var invoice = require('./invoice');
//app.use(express.static(__dirname + '/Flighty'));

//app.use(cookieParser());

var bodyParser = require('body-parser');
var app=express();
app.use(cookieParser());
app.get('/',function(req,res){
   fs.readFile("./Flighty/index.html",function(err,content)
    { res.end(content);

   });
});

app.set('view engine','ejs');
app.use(express.static(__dirname + '/Flighty'));
app.use(express.static(__dirname + '/Flighty/css'));

app.get('/Flighty/contact.html',function(req,res){
   fs.readFile("./Flighty/contact.html",function(err,content)
   {
      res.end(content);
    });
})

//app.use(express.static(__dirname + '/Flighty'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/about',about);
app.use('/signup',signup);
app.use('/login',login);
//app.use('/form',form);
app.use('/db',db);
app.use('/index',index);
app.use('/register',register);
//app.use(cookieParser());
app.use('/invoice',invoice);



app.get('/setcookie',function(req,res){
//setting cookies

res.cookie('username','Vishal',{maxAge: 900000, httpOnly:true});
return res.send('Cookie has been set');
});

app.get('/getcookie',function(req,res){
var username = req.cookies['username'];
if(username){
return res.send(username);
}

return res.send('No cookie found');
});



app.listen(8080);
console.log('now listening to port 8080');


