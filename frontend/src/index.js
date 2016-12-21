var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    /* once connected, emit an event sending a message. */
    /* Grab message from form and send it to server.  */
    socket.emit('createMessage', {
	from: "Ray",
	to: 'bob@ladida.com',
	text: 'Hey, bob!'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

/* Once message is sent from the server, display it on the screen. */
socket.on('newMessage', (message) => {
    console.log('Message coming in');
    console.log(message);    
});
