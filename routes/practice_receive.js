let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let comp = require('../function/compiler');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.post('/',function(req,res){
	//var title = req.body.title;
	var language = req.body.language;
	var code = req.body.code;
	var source = code.split(/\r\n|\r\n/).join("\n");
	var source_path = './sources/';	
	//컴파일 메소드 호출
	comp.compileFunction(language,source_path,source,res);
})

module.exports = router;
