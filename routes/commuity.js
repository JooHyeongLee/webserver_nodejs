let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let board = require('../function/board')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
router.get('/',function(req,res){
	board.boardLoadFunction(req,function(result){
		let jsonStr = JSON.stringify(result)
		let page = req.query.page
		//게시물이 하나도 없을 때
		if(result.length===0)		
			res.render('commuity',{data:0, page:1, login:req.session.login})
		//게시물이 10개 이하일 때
		else if(result.length <=10){
			res.render('commuity',{data:jsonStr, page:1, login: req.session.login})
		}
		//게시물이 10개 이상일 때
		else {
			if(page===1){
				let list = []
				for(let i=0;i<10;i++)
					list[i] = result[i]
				res.render('commuity',{data:JSON.stringify(list), page:parseInt( Math.ceil(result.length/10) ), login:req.session.login})
			}
			else{
				let list = []
				let idx=0;
				//한 페이지의 남은 게시물이 10개 미만일 때
				if(page*10>result.length){
					for(let i=page*10-10;i<result.length;i++){
						list[idx] = result[i]
						idx++
					}
				}
				//한 페이지의 남은 게시물이 10개일 때
				else {
					for(let i=page*10-10;i<page*10;i++){
						list[idx] = result[i]
						idx++
					}
				}
				res.render('commuity',{data:JSON.stringify(list), page:parseInt( Math.ceil(result.length/10) ),login:req.session.login})
			}
		}
	})
})
module.exports = router;
