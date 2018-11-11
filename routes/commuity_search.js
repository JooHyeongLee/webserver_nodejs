var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var board = require('../function/board')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.post('/',function(req,res){
	var opt = req.body;
	var word = req.body;
	board.boardSearchFunction(opt,word,function(result,name){
		res.json({
			result: result,
			name: name
		})
	})
})

module.exports = router;
