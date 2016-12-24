var Converter = require("csvtojson").Converter;
var express = require('express');
var userRouter  = express.Router();//router is a function inside express application
var csvFileName="./sachin.csv";
var csvConverter=new Converter({});
var fs=require("fs"); 
module.exports.controllerFunction = function(app) {
userRouter.get('/getsachindata',function(req,res)
{

 	csvConverter.on("end_parsed",function(jsonObj)
  	{
    //console.log(jsonObj);
    res.send(jsonObj); //here is your result json object
	});
	fs.createReadStream(csvFileName).pipe(csvConverter);
});
app.use('/', userRouter);
}
