import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';


export default class Sidebar extends Component {
    renderUsers() {
	/* Render list of users */
	const users = this.props.users;
	if (!users) {
	    return (
		<div>No users.</div>
	    );
	};
	return users.map((user) => {
	    return (
		<li key={user}>
			{user}
		</li>
	    )
	});
    }


    renderChannels() {
	/* Render list of channels */
	const channels = this.props.channels;
	if (!channels) {
	    return (
		<div>No channels.</div>
	    );
	};
	return channels.map((channel) => {
	    var link = channel; /* .toLowerCase();*/
	    return (
		<li key={channel}>
		    <Link to={link}>
			{channel}
		    </Link>
			
		</li>
	    )
	});
    }
    
    
    render() {
	return (
	    <div className="sidebar">
		Channels:
		<ul>
		    {this.renderChannels()}
		</ul>

		Users:
		<ul>
		    {this.renderUsers()}
		</ul>
	    </div>	    
	);
    }
}

