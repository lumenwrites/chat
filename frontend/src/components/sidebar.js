import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router';

export default class Sidebar extends Component {

    renderUsername() {
	const username = this.props.username;

	if (!username) {
	    return (
		<div></div>
	    );
	};

	return (
	    <div>
		<b>@{username}</b>
	    </div>
	);
    }

    

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


    goToChannel(channel) {
	browserHistory.push(channel);
	this.props.joinChannel(channel);
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
		<li key={channel} >
		    <a onClick={() => this.goToChannel(channel)}>
			{channel}
		    </a>
			
		</li>
	    )
	});
    }
    
    
    render() {
	return (
	    <div className="sidebar">
		{this.renderUsername()}		
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

