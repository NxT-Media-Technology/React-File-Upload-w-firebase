import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			username: '',
			password: '',
			statusMsg: false,

		}

		this.handleLogin = this.handleLogin.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
	}

	handleLogin(event) {
		event.preventDefault();
		Axios.post("http://localhost:3001/login", {
			username: this.state.username,
			password: this.state.password})
		.then((response) => {
			this.setState({statusMsg: response.data})
		})
	}

	handleUsername(event) {
		this.setState({username: event.target.value})
	}

	handlePassword(event) {
		this.setState({password: event.target.value})
	}

	render() {
		return (
			<div id='login-component'>
				<div className="login-header">
					<h1>Login to gain acces to the Adminpanel</h1>
				</div>
				<div className="login-form">
					<form onSubmit={this.handleLogin}>
								
						<label>Username</label>
						<input type ="text" id='username' onChange={this.handleUsername} name="username" placeholder="Username" required />

						<label>Password</label>
						<input type="password" id="password" onChange={this.handlePassword} name="password" required />

						<button type="submit">Submit</button>

						{this.state.statusMsg ? this.state.statusMsg : ''}

				    </form>
				</div>
				
			</div>
		);
	}
}

export default Login;