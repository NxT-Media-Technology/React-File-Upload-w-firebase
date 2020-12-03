import React, { Component } from 'react';
import Axios from 'axios';
import logo from '../images/logo.png';

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password1: '',
			password2: '',
			statusMsg: false,
		}

		this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister(event) {
		event.preventDefault();
		Axios.post("http://localhost:3001/register", {
			username: this.state.username,
			password1: this.state.password1,
			password2: this.state.password2,
		})
		.then((response) => {
			this.setState({statusMsg: response.data})
		})
	}

	handleChange = (e) => {this.setState({[e.target.name]: e.target.value});}


	render() {
		return (
			<div>
				<div id='login'>
					<div id="login-container">
					<div className="login-header">
						<img src={logo} ></img>
						<h1>Create new user with acces to Adminpanel</h1>
					</div>
					<div className="login-form">
						<form onSubmit={this.handleRegister}>
									
							<label>Username</label>
							<input type ="text" id='username' onChange={this.handleChange} name="username" placeholder="username" required />

							<label>Password</label>
							<input type="password" id="password" onChange={this.handleChange} placeholder="Password" name="password1" required />

							<label>Confirm Password</label>
							<input type="password" id="password" onChange={this.handleChange} placeholder="Password" name="password2" required />

							<button type="submit">Login</button>

							{this.state.statusMsg ? <p align="center">{this.state.statusMsg}</p>: null}

					    </form>
					</div>
				</div>
			</div>

			</div>
		);
	}
}

export default Register;