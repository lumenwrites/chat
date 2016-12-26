import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

/* Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap';

/* My Components */
import Sidebar from './sidebar';
import Header from './header';
import Message from './message';
import MessageBox from './messagebox';

/* Socket.io magic incatations. */
/* These two lines automatically connect to the server, allowing me */
/* to emit and receive events */
import io from 'socket.io-client';
let socket = io(`http://localhost:3000`);


export default class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    username: "",
	    channel: "",
	    users: [],
	    messages:[],	    
	    channels:["General",
		   "Startups",
		   "Webdev",
		   "Rationality",
		   "AskHC",
		   "ShowHC",
		   "Science",
		   "Design",
		   "Marketing"]	    
	};

	this.setUsername = this.setUsername.bind(this);
    }


    setUsername(username){
	/* temporarily set state here to pass username conveniently to the server */
	/* getting username from get url and adding it to the state before I emit
	   join */
	this.setState({
	    username: username,
	    channel: this.props.params.channel
	}, () => {
  	    socket.emit('join', this.state, (err)=>{
		console.log(`${this.state.username} joined ${this.state.channel}`);
	    });
	});

    }


    
    
    componentDidMount() {
	socket.on('connect', () => {
	    /* console.log(">>>> src/components/chat.js:");
	       console.log('Connected to server');*/

	    /* Join channel */
  	    socket.emit('client:joinRoom', this.props.params.channel, (ackn)=>{
		
	    });
	    
	});
	socket.on('disconnect', () => {
	    /* console.log(">>>> src/components/chat.js:");
	       console.log('Disconnected from server');*/
	});


	/* Receive new message, add it to the state */
	socket.on(`server:newMessage`, data => {
	    /* Add new message to the state */
	    this.setState({
		messages: this.state.messages.concat([data])
	    });
	    /* console.log(">>>> src/components/chat.js:");
	       console.log('Message received from server and added to state', data);*/
	    this.scrollToBottom();
	})

	/* Update user list */
	socket.on('server:updateUserList', (users) => {
	    /* console.log('users list:', users);*/
	    this.setState({users});
	    
	});
    }

    scrollToBottom() {
	var messages = ReactDOM.findDOMNode(this.refs.messages);
	var clientHeight = messages.clientHeight;
	var scrollTop = messages.scrollTop;
	var scrollHeight = messages.scrollHeight;	
	var messageHeight = 43;
	if (clientHeight + scrollTop + messageHeight + messageHeight >= scrollHeight) {
	    /* console.log('should scroll');*/
	    messages.scrollTop = scrollHeight;
	}
    };
    
    renderMessages() {
	const messages = this.state.messages;
	/* console.log(">>>> src/components/chat.js:");
	   console.log('Taking messages from the state and rendering them');*/
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
	/* router parses url for me, and I'm grabbing get parameters */
	/* var username = this.props.location.query.username;*/
	/* console.log(this.props.location);*/

	return (
	    <div className="mainWrapper">
		<Sidebar users={this.state.users} channels={this.state.channels}/>
		<div className="chat">
		    <Header channel={this.props.params.channel} />
		    <div className="messages" ref="messages">
			{ this.renderMessages() }
		    </div>		    
		    <MessageBox socket = { socket }
				username={this.state.username}
				setUsername = {this.setUsername}
				channel={this.props.params.channel}/>
		</div>	    
	    </div>
	);
    }
}
