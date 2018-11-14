let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
let board = require('../function/board')
let models = require('../models')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.get('/:id',function(req,res){
	let id = req.params.id;
	models.Board.findAll({
		where: {'id':id}
	}).then(function(result){
		//user name search
		models.User.findOne({
			where:{'id':result[0].dataValues.fk_userId}
		}).then(function(info){
			models.Board.update({count:++result[0].dataValues.count},
				{where: {'id':id} })
			let jsonObj = JSON.stringify(result)
			let infoObj = JSON.stringify(info)
			res.render('commuity_detail',{data:jsonObj, info:infoObj})
		})
	})
})

module.exports = router;
