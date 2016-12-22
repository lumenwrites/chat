import React, { Component } from 'react';



export default class MessageBox extends Component {
    render() {
	return (
	    <div className="footer">
		<form id="message-form">
		    <textarea name="message" type="text"
			      placeholder="Message" autofocus></textarea>
		    <button className="button">Post</button>
		</form>
	    </div>
	);
    }
}
