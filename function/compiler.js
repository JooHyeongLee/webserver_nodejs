let fs = require('fs');
let spawn = require('child_process').spawn;
let cp = require('child_process');
let exec = require('child_process').exec;
let models = require('../models');
let async = require('async');
function compileFunction(lan,path,source,res){
	let file, compile,run,responseData;
	let tasks = [
		//파일 작성
		function(callback){
			if(lan==='c')
				file = path+'test.c';
			else if(lan==='java')
				file = path+'Test.java';
			else if(lan==='python')
				file = path+'test.py';
			fs.writeFile(file,source,'utf-8',err=>{if(err) throw err;});
			callback(null,file);
		},
		//작성된 파일을 컴파일
		function(file,callback){
			if(lan==='c'){
				compile = exec('gcc test.c',{cwd:'sources'},(err,stdout,stderr)=>{
					if(stderr.length===0){
						let run = spawn('./sources/./a.out',[]);
						run.stdout.on('data',stdout=>{
							callback(null,stdout.toString('utf8'));
						})
					}		
					else
						callback(true,stderr)
				})
			}
			else if(lan==='java'){
				compile = exec('javac Test.java',{cwd:'sources'},(err,stdout,stderr)=>{
					if(stderr.length===0) {
						let run = exec("java Test",{cwd:'sources'},(err,stdout,stderr)=>{
							callback(null,stdout);
						});
					}
					else
						callback(true,stderr)
				})
			}
			else if(lan==='python'){
				compile = exec('python3 test.py',{cwd:'sources'},(err,stdout,stderr)=>{
					if(stderr.length===0) {
						callback(null,stdout)
					}
					else 
						callback(true,stderr)
				})
			}
		},
		//컴파일 후 나온 결과를 반환
		function(stdout,callback){
			callback(null,stdout)
		}
	]
	async.waterfall(tasks,(err,msg)=>{
		if(err){
			responseData = {'result':'err','output':msg};
			res.json(responseData);
		}
		else{
			responseData = {'result':'ok','output':msg};
			res.json(responseData);
			console.log('done');
		}
	});
}
exports.compileFunction = compileFunction;
