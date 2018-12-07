let express = require('express')
let fs = require('fs')
let router = express.Router()
let app = express();
let path = require('path')

router.get('/',(req,res)=>{
	res.sendFile('index.html',{root:'views/'})
});

module.exports = router;
