import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

export default class MessageBox extends Component {
    sendMessage(event) {
	event.preventDefault();
	/* Socket is passed here as props from chat.js */
	const socket = this.props.socket;
	/* Emit an event telling server to create message */
	socket.emit(`client:createMessage`, {
	    from: this.props.username,
	    text: ReactDOM.findDOMNode(this.refs.message).value
	});
	this.refs.message.value="";	
    }


    join(event) {
	event.preventDefault();
	/* Take username from the text field */
	var username = ReactDOM.findDOMNode(this.refs.username).value;
	this.refs.username.value="";	
	
	/* browserHistory.push('/?username=' + username);*/

	this.props.setUsername(username);
    }
    
    render() {
	if (this.props.username) {
	    return (
		<div className="footer">
		    <form onSubmit={this.sendMessage.bind(this)} id="message-form">
			<textarea name="message" type="text"
				  placeholder="Message" autofocus
				  ref="message"></textarea>
			<button className="button">Post</button>
		    </form>
		</div>
	    );
	} else {
	    return (
		<div className="footer">
		    <form onSubmit={this.join.bind(this)} id="message-form">
			<textarea name="message" type="text"
				  placeholder="username" autofocus
				  ref="username"></textarea>
			<button className="button">Join</button>
		    </form>
		</div>
	    );	    
	}
    }
}
