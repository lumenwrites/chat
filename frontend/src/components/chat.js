import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';


import Header from './header';
import Message from './message';
import MessageBox from './messagebox';

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
	    console.log('Connected to server');
	});
	socket.on('disconnect', () => {
	    console.log('Disconnected from server');
	});

	/* Receive new message, add it to the state */
	socket.on(`server:newMessage`, data => {
	    /* Add new message to the state */
	    this.setState({ messages: this.state.messages.concat([data]) })
	    console.log(this.state.messages);
	})

	
	this.sendMessage({
	    from: 'User',
	    text: 'Test message!'
	});

    }


    renderMessages() {
	const messages = this.state.messages;
	if (!messages) {
	    return (
		<div>No messages.</div>
	    );
	};
	return messages.map((message) => {
	    return (
		<div key={message.createdAt}>
		    {message.text}
		</div>
	    )
	});
    }
    
    sendMessage(message) {
	socket.emit(`client:createMessage`, message)
    }


    /* 
    componentDidMount() {
	socket.on('init', this._initialize);
	socket.on('send:message', this._messageRecieve);
	socket.on('user:join', this._userJoined);
	socket.on('user:left', this._userLeft);
	socket.on('change:name', this._userChangedName);
    };
    */    
    render() {
	return (
	    <div className="chat">
		<Header />
		<div className="messages">
		    { this.renderMessages() }
		</div>		    
		<MessageBox socket = { socket } 
			    sendMessage = { this.sendMessage }/>
	    </div>	    
	);
    }
}

