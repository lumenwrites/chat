var socket = io();

function broadcastMessage() {
    socket.emit('createMessage', {
	from: "Ray",
	to: 'bob@ladida.com',
	text: 'Hey, bob!'
    });
};

/* 'connect' is a default event that gets send to me once I'm connected to server */
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

/* Once message is sent from the server, display it on the screen. */
socket.on('newMessage', (message) => {
    console.log('Message coming in');
    console.log(message);    
});
