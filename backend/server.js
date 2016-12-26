
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const {Users} = require('./users');
var users = new Users();

/* Create express app */
var express = require('express');
var app = express();

/* Configure app to work with socket.io */
/* io variable is a web sockets server */
var server = http.createServer(app);
var io = socketIO(server);

/* Configure middleware to serve frontend static files */
const path = require('path');
const frontendFilesPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendFilesPath));


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
	callback('Succesfully joined the channel ${channel}');
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
	console.log('Create message: ', message);
	/* Ackdnowledgement. */
	/* callback('Server has received the message.');*/
	/* Send out the received message to all the users. */
	/* socket.emit emits a message to only one connection */
	/* io.emit emits message to all the connections */
	io.to(message.channel).emit('server:newMessage',
				    generateMessage(message.from, message.text));
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



/* Set port with PORT environment variable. Or use 3000 by default. */
const port = process.env.PORT || 3000;
/* Start server */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
