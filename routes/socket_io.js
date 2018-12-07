const express = require('express')
let fs = require('fs')
const router = express.Router()
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
