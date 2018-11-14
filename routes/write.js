let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.get('/',function(req,res){
	res.render('write')
})

module.exports = router;
