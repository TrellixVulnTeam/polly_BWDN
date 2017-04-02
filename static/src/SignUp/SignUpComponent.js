import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class SignUpComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			username: "",
			tempPassword: "",
			rptPassword: ""
		}

		// This binding is necessary to make `this` work in the callback
    	this.signUp = this.signUp.bind(this); 
    	this.signUpClick = this.signUp.bind(this);		  
		// this.checkPassword = this.checkPassword.bind(this);
	}

	signUpClick() {

		// TODO: validate things

		this.signUp();
	}

	signUp() {

		var state = this.state;
		var userToAdd = {
			email: state.email,
			username: state.username,
			password: state.password
		}

		// Adding user data to db
		fetch('/polls/users/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userToAdd)
		}).then(
			function successCallback(response) {
				if (response.status == 201) {

					// Going to login view
					
				}
			}, 
			function errorCallback(response) {
				var n = 0;
				n+=3;
			}
		);
	}

	checkPassword(value, isRpt) {

		var stateChange;
		// Setting temp
		if (isRpt) {
			stateChange = {rptPassword: value};
		} else {
			stateChange = {tempPassword: value};
		}

		this.setState(stateChange, function() {

			// Checking if password and repeat 
			if (this.state.rptPassword === this.state.tempPassword) {
				this.setState({password: value});
				console.log("password good");
			} else {
				this.setState({password: ""});
			}
		});
	}

	render() {

		var signInStyle = {
			margin: 20
		}
		return (
			<div>
				<div>
					<TextField 
						hintText="username" 
						onChange={(event) => this.setState({username: event.target.value})}
						value={this.state.username}
					/>
				</div>
				<div>
					<TextField 
						hintText="email"
						onChange={(event) => this.setState({email: event.target.value})}						 
						value={this.state.email}
					/>
				</div>
				<div>
					<TextField 
						hintText="password" 
						type="password" 
						onChange={(event) => this.checkPassword(event.target.value)}
						value={this.state.tempPassword}
						/>
				</div>
				<div>
					<TextField 
						hintText="repeat password" 
						type="password" 
						onChange={(event) => this.checkPassword(event.target.value, true)}						
						value={this.state.rptPassword}
						/>
				</div>
				<div>
					<RaisedButton 
						label="Sign up!"
						 style={signInStyle} 
						 primary={true} 
						 onClick={this.signUpClick} 
						 disabled={this.state.password === ""}
					/>
				</div>
				<div>
					<FlatButton label="already registered? login!"/>
				</div>
			</div>
		)
	}
}

module.exports = SignUpComponent;