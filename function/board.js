let models = require('../models');
let async = require('async');

function boardLoadFunction(req,callback) {
	models.Board.findAll().then((result)=>{		//result가 board 테이블의 모든 값을 json으로 반환
		let obj = new Map();
		let jsonObj = [];						//board 테이블의 데이터를 담을 배열
		let tasks = [
			function(call){			
				if(result.length===0)	//게시판에 글이 하나도 없을 때0값 리턴
					callback(0)
				else{
					for(let i=0;i<result.length;i++)		//데이터의 개수만큼 반복문
						jsonObj.push(result[i].dataValues)	//jsonObj 배열에 select * from board 값을 저장
					call(null,jsonObj);						//위의 쿼리문 결과를 다음 함수로 넘겨줌
				}
			},
			function(jsonObj,call){
				let nameList = {};						//{ 외래키 : 이름 } 의 형태로 만들 json 데이터
				//데이터 개수만큼 select문이 반복되는걸 해결할 수 있을까
				jsonObj.forEach((element,index)=>{		//board 테이블과 user테이블의 데이터를 비교
					models.User.findOne({
						where:{id:element.fk_userId}	//board의 외래키와 user의 id값의 일치여부
					}).then((user)=>{
						nameList[element.fk_userId] = user.dataValues.name	//nameList 객체에 { 외래키 : 이름 } 으로 저장
						if(jsonObj.length===index+1){		//nameList 저장이 끝났으면
							jsonObj.every((element,i)=>{	
								jsonObj[i].name = nameList[element.fk_userId]	//jsonObj 객체 배열에 매칭
								return i<jsonObj.length
							})
							callback(jsonObj)
						}
					})
				})
			}
		]
		async.waterfall(tasks,function(err){
			if(err)
				console.log(err)
		})
	}).catch(function(err){
		console.log(err);
	})
}
function boardSearchFunction(opt,word,callback) {
	let res = {'res':'null'}
	if(opt.opt==='작성자'){
		models.User.findAll({
			where:{name:word.word}
		}).then(function(user){
			models.Board.findAll({
				where:{fk_userId: user[0].dataValues.id}
			}).then(function(user){
				callback(user)
			})
		}).catch(function(err){
			callback(res)
		})
	}
	else if(opt.opt==='제목'){
		let i = 0
		let names=[]
		models.Board.findAll({
			where: {subject:word.word}
		}).then(function(board){
			if(board.length===0)
				callback(res)
			board.forEach(function(element){
				models.User.findAll({
					where: {id: element.dataValues.fk_userId}
				}).then(function(user){
					names[i] = {'name':user[0].dataValues.name}
					i++
					if(board.length===i)
						callback(board,names)
				})
			})
		}).catch(function(err){
			callback(res)
		})
	}
	else
		callback(res)
}

const boardWriteFunction = (...args)=>{
	//subject, content, fk_userId, callback
	let responseData = {'result':'ok'}
	models.Board.create({
		subject:args[0],
		content:args[1],
		fk_userId: args[2],
	}).then(function(result){
		args[3](responseData)
	}).catch(function(err){
		console.log(err)
	})
}
exports.boardLoadFunction = boardLoadFunction;
exports.boardSearchFunction = boardSearchFunction;
exports.boardWriteFunction = boardWriteFunction;
