var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var board = require('../function/board')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.get('/',function(req,res){
	board.boardLoadFunction(function(result){
		var jsonStr = JSON.stringify(result);
		if(result.length==0)
			res.render('commuity',{data:0})
		else
			res.render('commuity',{data:jsonStr})
	})
})

module.exports = router;
