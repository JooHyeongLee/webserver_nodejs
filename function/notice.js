var models = require('../models');
var member = require('./singleton');
var async = require('async');

function noticeFunction(callback) {
	models.Board.findAll().then(function(result){
		var jsonObj = [];
		var tasks = [
			function(call){
				for(var i=0;i<result.length;i++){
					jsonObj.push(result[i].dataValues)
				}
				call(null,jsonObj);
			},
			function(jsonObj,call){
				var i =0;
				jsonObj.forEach(function(element){
					models.User.findAll({
						where:{id:element.fk_userId}
					}).then(function(user){
						jsonObj[i].name = user[0].dataValues.name
						i++;
						if(i===jsonObj.length){
							call(null,jsonObj)
						}
					})
				})
			}
		]
		async.waterfall(tasks,function(err){
			if(err)
				console.log(err)
			else
				callback(jsonObj)
		})
	}).catch(function(err){
		console.log(err);
	})
}

exports.noticeFunction = noticeFunction;
