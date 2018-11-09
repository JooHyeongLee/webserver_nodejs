var express = require('express')
var router = express.Router()
var app = express();
var path = require('path')
var board = require('../function/board')
var models = require('../models')
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.get('/:id',function(req,res){
	var id = req.params.id;
	models.Board.findAll({
		where: {'id':id}
	}).then(function(result){
		//user name search
		models.User.findOne({
			where:{'id':result[0].dataValues.fk_userId}
		}).then(function(info){
			models.Board.update({count:++result[0].dataValues.count},
				{where: {'id':id} })
			var jsonObj = JSON.stringify(result)
			var infoObj = JSON.stringify(info)
			res.render('commuity_detail',{data:jsonObj, info:infoObj})
		})
	})
})

module.exports = router;
