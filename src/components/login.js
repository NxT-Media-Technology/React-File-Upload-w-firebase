import React, { Component } from 'react';
import Axios from 'axios';
import logo from '../images/logo.png';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			username: '',
			password: '',
			token:false,
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
			password: this.state.password,
		})
		.then((response) => {
			if(response.status === 200 && typeof response.data === 'object'){
				this.props.pass(response.data);
				console.log(response.data);
			}
			else {
				this.setState({statusMsg: response.data});				
			}
			// const token = true;
			// this.props.pass(token);
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
			<div id='login'>
				<div id="login-container">
				<div className="login-header">
					<img src={logo} ></img>
					<h1>Login to gain access to the Adminpanel</h1>
				</div>
				<div className="login-form">
					<form onSubmit={this.handleLogin}>
								
						<label>Username</label>
						<input type ="text" id='username' onChange={this.handleUsername} name="username" placeholder="Username" required />

						<label>Password</label>
						<input type="password" id="password" onChange={this.handlePassword} placeholder="Password" name="password" required />

						<button type="submit">Login</button>

						{this.state.statusMsg ? <p align="center">{this.state.statusMsg}</p>: null}

				    </form>
				</div>
				</div>
			</div>
		);
	}
}

export default Login;