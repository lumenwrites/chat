
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
    socket.emit('server:newMessage', generateMessage("Admin", "Welcome to our chat!!"));
    /* Send userlist */
    socket.emit('server:updateUserList',
		users.getAllUsers());



    /* Join a room */
    socket.on('join', (params, callback) => {
	socket.join(params.channel);
	//socket.leave(channel);
	/* Acknowledge successfully joining */
	users.removeUser(socket.id);
	users.addUser(socket.id, params.username, params.channel);
	console.log("User to add: ", params.username);
	console.log("Got the join event, added user to Users. Users: ", users);

	/* io.to(params.channel).emit('server:updateUserList', users.getUserList(params.room));*/
	io.emit('server:updateUserList', users.getUserList(params.room));

	/* Broadcast a message telling that user has connected to everyone else */
	/* Broadcasting means emitting event to everybody
	   except for the user who sent it. except for this socket. */
	socket.broadcast.to(params.channel).emit('server:newMessage', generateMessage("Admin", "New user joined!"));

	
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
	io.emit('server:newMessage', generateMessage(message.from, message.text));
    });

    /* Disconnect */
    socket.on('disconnect', () => {
	console.log('Client has disconnected');
	var user = users.removeUser(socket.id);
	if (user) {
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
