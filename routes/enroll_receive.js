var express = require('express');
var router = express.Router();
var app = express();
var path = require('path')
var validation = require('../function/enrollValidation')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.post('/',function(req,res){
	//name,email,nickname,password,confirm
	var info = req.body;
	validation.enrollValidation(info,res);
})

module.exports = router
