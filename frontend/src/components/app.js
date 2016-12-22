import React, { Component } from 'react';

/* Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap';

/* My Components */
import Sidebar from './sidebar';


export default class App extends Component {
    render() {
	/* For child routers */
	const { children } = this.props;

	return (
	    <div className="mainWrapper">
		<Sidebar />
		{ children }
	    </div>
	);
    }
}
