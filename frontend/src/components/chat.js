import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';


import Header from './header';
import MessageBox from './messagebox';



export default class Chat extends Component {
    render() {
	return (
	    <div className="chat">
		<Header />
		<div className="messages">
		    Messages!
		</div>		    
		<MessageBox />
	    </div>	    
	);
    }
}

