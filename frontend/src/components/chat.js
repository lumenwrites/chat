import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';







export default class Chat extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    users: ["Ray", "Test", "Troy", "Abed"],
	    messages:[],
	    rooms:["General",
		   "Startups",
		   "Webdev",
		   "Rationality",
		   "AskHC",
		   "ShowHC",
		   "Science",
		   "AskHC",
		   "Design",
		   "Marketing"]	    
	};
    }



    render() {

	return (
	);
    }
}

