

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var fs= require('fs');

const bodyParser = require('body-parser');

router.use(cookieParser());


router.get('/',function(req,res){

//   fs.readFile("form.html",function(err,content)
 //   { res.end(content)};


 //    res.writeHead(200, {
 //  'Content-Type': 'text/html'});


//   res.write(req.cookies.username);

  // fs.readFile("form.html",function(err,content)
   // {
   //   res.end(content);
  // });


console.log("In form");
res.sendFile('/form.html',{root:__dirname});

});




router.post('/',function(req,res){

var stpoint=req.body.startpoint;
var destpoint=req.body.destpoint;


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


  var sql = "select * from flight where startpoint = ? and destpoint= ?";
  connection.query(sql,[stpoint, destpoint], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
        console.log(result);

   

     res.writeHead(200, {
   'Content-Type': 'text/html'});

  res.write(req.cookies.username);


res.write("<form action='/form' method='post'><select name='startpoint'><option value='delhi'>Delhi</option><option value='chandigarh'>Chandigarh</option></select><select name='destpoint'><option value='delhi'>Delhi</option><option value= 'chandigarh'>Chandigarh</option></select><input type='submit' name='submit'></form> ");


res.write('<table border=1px>');
res.write('<tr><th>'+'Flightno'+'</th><th>'+'Flightname'+'</th><th>'+'Start Point'+'</th><th>'+'Destination Point'+'</th><th>'+'Arrival Time'+'</th><th>'+'Departure Time'+'</th><th>'+'Economic Fare'+'</th><th>'+'Business Fare'+'</th><th>'+'Register'+'</th></tr>');


for(var i=0;i<result.length;i++)
{
 res.write("<form action='/register' method='post'>");
 res.write("<tr><td><input type='text' name= 'flightno' style='setEditable:false;' value="+result[i].flightno+" readonly></td>");
 res.write('<td>'+result[i].flightname+'</td>');
 res.write('<td>'+result[i].startpoint+'</td>');
 res.write('<td>'+result[i].destpoint+'</td>');
 res.write('<td>'+result[i].arrivaltime+'</td>');
 res.write('<td>'+result[i].depttime+'</td>');
 res.write('<td>'+result[i].economicfare+'</td>');
 res.write('<td>'+result[i].businessfare+'</td>');
 res.write('<td>'+'<input type="submit" value="BookNow">'+'</td></tr>');
 res.write('</form>');
}
res.end('</table>');
 });
connection.end();
});

module.exports=router;
