const express = require('express');
const http = require('http')
const socket = require('socket.io');
const bodyParser = require('body-parser');

const game_route = require('./routes/game');

//declare global variables
//let counter =1000;
var investAmount = 100;
const betRate = 0.60;
let userAmount;

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
	
		function diceToast(){
			//let dice1 = (Math.floor((Math.random()*6)+1))
			let dice2 = (Math.floor((Math.random()*2)+1))
		    //let diceSum = dice1 + dice2;
		    
		    return dice2;
		}

    io.emit('invest_amount',investAmount);
    socket.on('amount', (amount) =>{
    	console.log(amount);
    	//let stream_amount = investAmount -amount;
        //io.emit('amount',stream_amount);
        	


    socket.on('bet', (bet) =>{
    	console.log('user bet number: ',bet);
    	let dicet_T = diceToast()
    	console.log('generated number: ',dicet_T);
    	if(dicet_T == bet){
    		userAmount =amount;
    		let win = (investAmount + (userAmount * betRate));
    		let b = 'Won'
    		io.emit('won', b);
    		io.emit('win', win);
    		console.log(`you have won: R${userAmount*betRate} and Total amount: R${win}`);
    		
    	}else if(diceToast() !== bet){
    		let a = 'Lose'
    		io.emit('lose', a);
    		console.log('you lost')
    		stream_amount = investAmount -amount;
    		console.log('Amount left: ',stream_amount);
    		io.emit('amount', stream_amount);
    	}	

    });
    	
    })

	socket.on('disconnect', () => {
		io.emit('leave', leaveID)
    console.log(`${leaveID} :Has Disconneced`);
  });

});
