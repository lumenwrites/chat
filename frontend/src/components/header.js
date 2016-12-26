import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {
    render() {
	return (
	    <div className="header">
		<Link to="/">
		    #{this.props.channel}
		</Link>
	    </div>
	);
    }
}


