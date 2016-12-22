
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');

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
    socket.emit('newMessage', generateMessage("Admin", "Welcome to our chat!"));

    /* Broadcast a message telling that user has connected to everyone else */
    /* Broadcasting means emitting event to everybody
       except for the user who sent it. except for this socket. */
    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined!"));

    /* listening to the event. Receivemessages from user. */
    /* once client sends me a message, I save it. */
    socket.on('createMessage', (message, callback) => {
	console.log('Create message: ', message);
	/* Ackdnowledgement. */
	callback('Server has received the message.');
	/* Send out the received message to all the users. */
	/* socket.emit emits a message to only one connection */
	/* io.emit emits message to all the connections */
	io.emit('newMessage', generateMessage(message.from, message.text));
    });

    /* Disconnect */
    socket.on('disconnect', () => {
	console.log('Client has disconnected');
    });
    
});



/* Set port with PORT environment variable. Or use 3000 by default. */
const port = process.env.PORT || 3000;
/* Start server */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
