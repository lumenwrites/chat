import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class MessageBox extends Component {

    sendMessage(event) {
	event.preventDefault();
	const socket = this.props.socket;
	socket.emit(`client:createMessage`, {
	    from: 'User',
	    text: ReactDOM.findDOMNode(this.refs.message).value
	});
    }
    
    render() {
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
    }
}
