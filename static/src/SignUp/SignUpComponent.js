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
		// this.checkPassword = this.checkPassword.bind(this);
	}

	signUp() {

	}

	checkPassword(value, isRpt) {

		var state = this.state;

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
						onChange={this.checkPassword.bind(this)}						
						value={this.state.rptPassword}
						/>
				</div>
				<div><RaisedButton label="Sign in!" style={signInStyle} primary={true} /></div>
				<div>
					<FlatButton label="already registered? login!"/>
				</div>
			</div>
		)
	}
}

module.exports = SignUpComponent;