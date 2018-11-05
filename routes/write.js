var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.get('/',function(req,res){
	res.render('write')
})

module.exports = router;
