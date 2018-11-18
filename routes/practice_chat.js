let express = require('express')
let router = express.Router()
let app = express();
let path = require('path')
var chatbot = require('../function/chatBot');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

router.post('/',function(req,res){
	var chat = req.body.chat;
	chatbot.chatBotFunction(chat,res);
})

module.exports = router;
