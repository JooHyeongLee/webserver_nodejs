let models = require('../models');
let member = require('./singleton');
let async = require('async');

function boardLoadFunction(callback) {
	models.Board.findAll().then(function(result){	//result가 board 테이블의 모든 값을 json으로 반환
		let jsonObj = [];				//board 테이블의 데이터를 담을 배열
		let tasks = [
			function(call){			
				if(result.length==0)	//게시판에 글이 하나도 없을 때0값 리턴
					callback(0)
				else{
					for(let i=0;i<result.length;i++)		//데이터의 개수만큼 반복문
						jsonObj.push(result[i].dataValues)	//jsonObj 배열에 select * from board 값을 저장
					call(null,jsonObj);						//위의 쿼리문 결과를 다음 함수로 넘겨줌
				}
			},
			function(jsonObj,call){
				let i =0;							
				let nameList = {};							//{ 외래키 : 이름 } 의 형태로 만들 json 데이터
				jsonObj.forEach(function(element){			//board 테이블과 user테이블의 데이터를 비교
					models.User.findOne({					
						where:{id:element.fk_userId}		//board의 외래키와 user의 id값의 일치여부
					}).then(function(user){
						nameList[element.fk_userId] = user.dataValues.name	
						//nameList 객체에 { 외래키 : 이름 } 으로 저장
						i++;
						if(jsonObj.length==i)	//배열 끝까지 비교가 끝나면 다음 함수로 넘겨줌
							call(null,nameList);		
					})
				})
			},
			function(nameList,call) {			//jsonObj에 name값을 추가한 데이터를 최종적으로 만듦
				let i=0
				jsonObj.forEach(function(element){	
					if(nameList.hasOwnProperty(element.fk_userId)){
						jsonObj[i].name = nameList[element.fk_userId]	//jsonObj객체에 name key와 key value 추가
						i++
					}
					if(i==jsonObj.length)
						callback(jsonObj)		//배열 끝까지 비교가 끝나면 app.js로 넘겨줌
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
	if(opt.opt=='작성자'){
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
	else if(opt.opt=='제목'){
		let i = 0
		let names=[]
		models.Board.findAll({
			where: {subject:word.word}
		}).then(function(board){
			if(board.length==0)
				callback(res)
			board.forEach(function(element){
				models.User.findAll({
					where: {id: element.dataValues.fk_userId}
				}).then(function(user){
					names[i] = {'name':user[0].dataValues.name}
					i++
					if(board.length==i)
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

function boardWriteFunction(subject,content,fk_userId,callback){
	let responseData = {'result':'ok'}
	models.Board.create({
		subject:subject,
		content:content,
		fk_userId: fk_userId,
	}).then(function(result){
		callback(responseData)
	}).catch(function(err){
		console.log(err)
	})
}
exports.boardLoadFunction = boardLoadFunction;
exports.boardSearchFunction = boardSearchFunction;
exports.boardWriteFunction = boardWriteFunction;
