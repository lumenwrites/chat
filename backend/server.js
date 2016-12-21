/* Set path to frontend files */
const path = require('path');
const frontendFilesPath = path.join(__dirname, '../frontend');

const socketIO = require('socket.io');
const http = require('http');


/* Create express app */
var express = require('express');
var app = express();

/* Configure app to work with socket.io */
/* io variable is a web sockets server */
var server = http.createServer(app);
var io = socketIO(server);

/* Configure middleware to serve frontend files */
app.use(express.static(frontendFilesPath));


io.on('connection', (socket) => {
    console.log('New user connected');


    /* Send a welcome message to the user who just connected */
    socket.emit('newMessage', {
	from: "Admin",
	text: "Welcome to our chat!",
	createdAt: new Date().getTime()	    
    });

    /* Broadcast a message telling that user has connected to everyone else */
    /* Broadcasting means emitting event to everybody
       except for the user who sent it. except for this socket. */
    socket.broadcast.emit('newMessage', {
	from: "Admin",
	text: "New user has joined!",
	createdAt: new Date().getTime()
    });
    
    /* listening to the event. Receivemessages from user. */
    /* once client sends me a message, I save it. */
    socket.on('createMessage', (message) => {
	console.log('Create message: ', message);

	/* Send out the received message to all the users. */
	/* socket.emit emits a message to only one connection */
	/* io.emit emits message to all the connections */
	io.emit('newMessage', {
	    from: message.from,
	    text: message.text,
	    createdAt: new Date().getTime()	    
	});
    });

    /* Disconnect */
    socket.on('disconnect', () => {
	console.log('Client has disconnected');
    });
    
});



/* Set port for heroku. Use 3000 by default. */
const port = process.env.PORT || 3000;
/* Start server */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
