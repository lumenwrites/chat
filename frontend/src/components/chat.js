import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';
import moment from 'moment';


import Header from './header';
import Message from './message';
import MessageBox from './messagebox';



/* Socket.io magic incatations. */
/* These two lines automatically connect to the server, allowing me */
/* to emit and receive events */
import io from 'socket.io-client';
let socket = io(`http://localhost:3000`);


export default class Chat extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    users: [],
	    messages:[]
	};
    }


    componentDidMount() {
	socket.on('connect', () => {
	    console.log(">>>> src/components/chat.js:");
	    console.log('Connected to server');
	});
	socket.on('disconnect', () => {
	    console.log(">>>> src/components/chat.js:");
	    console.log('Disconnected from server');
	});

	/* Receive new message, add it to the state */
	socket.on(`server:newMessage`, data => {
	    /* Add new message to the state */
	    this.setState({
		messages: this.state.messages.concat([data])
	    });
	    console.log(">>>> src/components/chat.js:");
	    console.log('Message received from server and added to state', data);
	    this.scrollToBottom();
	})
    }

    scrollToBottom() {
	var messages = ReactDOM.findDOMNode(this.refs.messages);
	var clientHeight = messages.clientHeight;
	var scrollTop = messages.scrollTop;
	var scrollHeight = messages.scrollHeight;	
	var messageHeight = 43;
	if (clientHeight + scrollTop + messageHeight + messageHeight >= scrollHeight) {
	    console.log('should scroll');
	    messages.scrollTop = scrollHeight;
	}
    };
    
    renderMessages() {
	const messages = this.state.messages;
	console.log(">>>> src/components/chat.js:");
	console.log('Taking messages from the state and rendering them');
	if (!messages) {
	    return (
		<div>No messages.</div>
	    );
	};
	return messages.map((message) => {
	    var formattedDate = moment(message.createdAt).fromNow();
	    /* .format('YYYY-MM-DD')*/
	    return (
		<div key={message.createdAt}>
		    <span className="right">{formattedDate}</span>		    
		    <b> {message.from} </b> <br/>
		    {message.text}
		    <hr/>
		</div>
	    )
	});
    }

    render() {
	var username = this.props.location.query.username;

	return (
	    <div className="chat">
		<Header />
		<div className="messages" ref="messages">
		    { this.renderMessages() }
		</div>		    
		<MessageBox socket = { socket } username={username}/>
	    </div>	    
	);
    }
}

