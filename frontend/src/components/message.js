import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

export default class Message extends Component {
    render() {
	return (
	    <div>
		<p>
		    Username: Hello guys!
		</p>
	    </div>
	);
    }
}


