let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let board = require('../function/board')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.post('/',function(req,res){
	let opt = req.body;
	let word = req.body;
	board.boardSearchFunction(opt,word,function(result,name){
		res.json({
			result: result,
			name: name
		})
	})
})

module.exports = router;
