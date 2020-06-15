const express = require('express');
const http = require('http')
const socket = require('socket.io');
const bodyParser = require('body-parser');

const game_route = require('./routes/game');

//declare global variables
let counter =1000;
let investAmount = 100;

const app = express();


//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set('view engine', 'ejs');


//routes
app.use('/game',game_route);


const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, ()=>{
    console.log(`Server instance Live on Port ${PORT}`);
    console.log(`http://localhost:${PORT}`)
})


const io = socket(server);

io.on('connect', (socket) =>{
	let userID = socket.id;
	let leaveID = socket.id;
	io.emit('login',userID)
	console.log(`${userID} :Has Been Connected.`);
	
    /*setInterval(function(){
	let rand = (Math.floor((Math.random()*20)+1))
	 io.emit('showtimer',rand);
     }, 2000);
     */

		/*setInterval(function(){
		let stream = counter -=1;
		 io.emit('counter',stream);
		},2000);*/
    io.emit('invest_amount',investAmount);

	socket.on('disconnect', () => {
		io.emit('leave', leaveID)
    console.log(`${leaveID} :Has Disconneced`);
  });

});

