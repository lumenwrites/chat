var socket = io();

function broadcastMessage() {
    socket.emit('createMessage', {
	from: "Ray",
	to: 'bob@ladida.com',
	text: 'Hey, bob!'
    }, function(data) {
	/* Acknowledgement */
	console.log(data);
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
    var msg = $('<p></p>');
    msg.text(`${message.from}: ${message.text}`);
    $("#messages").append(msg);
});



$("#message-form").on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
	from: "User",
	text: $('[name=message]').val()
    }, function(data) {
	/* Acknowledgement */
	console.log(data);
	/* Once message is received - clear text field value */
	$('[name=message]').val('');
    });    
});


/* Submit form on enter */
/* 
$(function() {
    $("[name=message]").keypress(function (e) {
        if(e.which == 13) {
            $("#chatbox").append($(this).val() + "<br/>");
            $(this).val("");
            e.preventDefault();
        }
    });
});
*/
