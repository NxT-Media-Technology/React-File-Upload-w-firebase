import React, { Component } from 'react';
import Axios from 'axios';

import Adminpanel from './components/Adminpanel.js';
import Login from './components/login.js';

class dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAuthorised: false,
		}
		this.changeAuth = this.changeAuth.bind(this);
	}

	//onChange={this.handleChange}
	changeAuth = (token) => {
		console.log(token)
		this.setState({isAuthorised: token})
	}

	render() {
		return (
			<div>
				{this.state.isAuthorised ? <Adminpanel /> : <Login pass={this.changeAuth} />}
			</div>
		);
	}
}


export default dashboard;