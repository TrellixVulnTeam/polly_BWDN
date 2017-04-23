import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {redA400} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import '../App.css';
import { browserHistory } from 'react-router';

class SignUpComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			username: "",
			tempPassword: "",
			rptPassword: "",
			errorMessage: "",
			emailValid: true
		}

		// This binding is necessary to make `this` work in the callback
    	this.signUp = this.signUp.bind(this); 
    	this.signUpClick = this.signUpClick.bind(this);		  
		this.onSnackbarClose = this.onSnackbarClose.bind(this);
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
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userToAdd)
		}).then((response) => {
			if (response.status == 400 || response.status == 500) {
				this.setState({errorMessage: "Username or Email already exists"});
			} else {
				this.goToLogin();
			}
		});
	}

	goToLogin() {
		// Going to login view
		browserHistory.push('/login');
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

	onSnackbarClose() {
		this.setState({errorMessage: ""});
	}
	render() {

		var signInStyle = {
			margin: 20
		}

		var snackbarStyle = {
			backgroundColor: redA400
		}
		return (
			<div>
				<Paper className='inputs-card'>
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
							disabled={this.state.password === "" || 
									  this.state.emailValid ||
									  this.state.username === ""}
							// TODO: validate email
						/>
					</div>
				</Paper>
				<div>
					<FlatButton 
						label="already registered? login!"
						onClick={(event) => this.goToLogin()}
					/>
				</div>
				<Snackbar
					open={this.state.errorMessage != ""}
					message={this.state.errorMessage}
					autoHideDuration={4000}
					onRequestClose={this.onSnackbarClose}
					bodyStyle={snackbarStyle}
				/>
			</div>
		)
	}
}

module.exports = SignUpComponent;