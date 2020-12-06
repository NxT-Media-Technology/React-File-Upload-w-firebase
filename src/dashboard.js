import React, { Component } from 'react';
import Adminpanel from './components/Adminpanel.js';
import Login from './components/login.js';

class dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			token: null,
			username: null
		}
		this.changeAuth = this.changeAuth.bind(this);
	}

	changeAuth = (token) => {
		console.log(token);
		if(token != null) {
			this.setState({
				token: token.token,
				username: token.username
			});	
		} else {
			this.setState({
				token: null,
				username: null
			});	
		}
	}

	render() {
		return (
			<div>
				{this.state.token ? <Adminpanel username={this.state.username} pass={this.changeAuth} token={this.state.token}/> : <Login pass={this.changeAuth} />}
			</div>
		);
	}
}


export default dashboard;