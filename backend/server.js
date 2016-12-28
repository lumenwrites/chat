const http = require('http'); 
const express = require('express'); 
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const util = require('util');

const {generateMessage} = require('./utils/message');
const {Users} = require('./users');
var users = new Users();

/* App setup */
/* Create express app */
var app = express();
/* Morgan is a logging framework, outputs requests into terminal. For debugging.*/
app.use(morgan('combined'));
// cors is ...
app.use(cors());


/* Create http server that can process http requests and send them to the app */
var server = http.createServer(app);
/* Configure app to work with socket.io */
/* io variable is a web sockets server */
const io = socketIO(server);

/* Configure middleware to serve frontend static files */
/* Not needed, because I'm going to serve frontend separately. */
const path = require('path');
const staticFiles = path.join(__dirname, '../frontend');
app.use('/static', express.static(staticFiles));

app.use((req, res) => res.sendFile(staticFiles+'/index.html'));


/* Mongoose config */
mongoose.Promise = global.Promise;
/* Connecting to mongo. */
/* Default local mongoDB url */
var MONGO_DB_URL = 'mongodb://localhost:27017/chat'
/* For Docker */
if ( process.env.DB_PORT ) {
    /* If there's a DB_PORT variable, then we're in Docker
       (I've set it in docker-compose) */
    /* and so I'm changing mongo url to this: */
    /* mongodb: is mongo's protocol, */
    /* db is the name of the container that runs mongo */
    MONGO_DB_URL = util.format('mongodb://db:%s/chat', process.env.DB_PORT);
}
/* Conncetiong to mongoose to mongo */
mongoose.connect(MONGO_DB_URL);

/* Message model */
const Message = require('./models/message');




io.on('connection', (socket) => {
    console.log('New user connected');
    /* Send a welcome message to the user who just connected */
    /* socket.emit('server:newMessage',
       generateMessage("Admin", "Welcome to our chat!!"));*/
    
    /* Once user connected - send him a current userlist. */
    socket.emit('server:updateUserList',
		users.getAllUsers());



    socket.on('client:joinRoom', (channel, callback) => {
	/* Do the socket magic that allows to send messages only to people in the room */
	socket.join(channel);
	/* Get all the messages from this channel */
	Message.find({channel:channel}).then((messages)=>{
	    console.log(`All messages on the ${channel} channel: ${messages} `);
	    callback(messages);
	});

	//socket.leave(channel);
    });    

    /* Join a room */
    socket.on('join', (params, callback) => {
	/* Make sure the user isn't already on this channel */
	users.removeUser(socket.id);
	/* Add user to the channel (to the users object) */
	users.addUser(socket.id, params.username, params.channel);
	console.log(`${params.username} joined ${params.channel}`);

	/* Emit an event to people in this room,
	   telling them to update the list of users,
	   and sending them the new user list. */
	io.to(params.channel).emit('server:updateUserList',
				   users.getUserList(params.channel));
	/* Emit event to everybody: */
	/* io.emit('server:updateUserList', users.getUserList(params.room));*/

	/* Broadcast a message to everybody
	   except for except for the user on this socket. */
	socket.broadcast.to(params.channel)
	      .emit('server:newMessage',
		    generateMessage("Admin",
				    `${params.username} has joined this channel!`));

	
	callback();
    });

    /* listening to the event. Receivemessages from user. */
    /* once client sends me a message, I save it. */
    socket.on('client:createMessage', (message, callback) => {

	/* Creating message */
	var message = new Message({
	    author: message.from,
	    body: message.body,
	    channel: message.channel,   
	    createdAt: moment().valueOf()	    
	});

	console.log('Create message: ', message);
	
	/* Saving message */
	message.save().then((message)=>{
	    /* console.log('Message saved', message);*/
	    /* Sending back acknowledgement. */
	    /* callback('Server has received the message:', message);*/
	}, (err) => {
	    console.log('Error saving the message', e);
	});

	/* Send out the received message to all the users. */
	/* socket.emit emits a message to only one connection */
	/* io.emit emits message to all the connections */
	console.log('Emitting message to channel', message.channel)
	io.to(message.channel).emit('server:newMessage', message);
	console.log('Message emitted to channel: ', message);	
	
	
    });

    /* Disconnect */
    socket.on('disconnect', () => {
	var user = users.removeUser(socket.id);
	if (user) {
	    console.log(`${user.username} has left ${user.channel}`);
	    io.to(user.channel).emit('server:updateUserList',
				     users.getUserList(user.channel));
	}
    });
    
});


/* Server setup */
/* Set port with PORT environment variable. Or use 3000 by default. */
const port = process.env.PORT || 3000;
/* Start server */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
