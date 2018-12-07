let express = require('express')
let fs = require('fs')
let router = express.Router()
let app = express();

router.get('/',function(req,res){
	if(req.session.login == undefined){
		req.session.login = false
		req.session.idx = -1
	}
	let images = fs.readdirSync('images')
	res.render('index',{imgNum:images.length});
})

module.exports = router;
