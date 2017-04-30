import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {redA400} from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';
import auth from '../Services/auth.js'
import cookie from 'react-cookie'
import Paper from 'material-ui/Paper';

class LoginComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			errorMessage: "",
			emailValid: true
		}

		this.login = this.login.bind(this);
		this.loginClick = this.loginClick.bind(this);
		this.onSnackbarCloe = this.onSnackbarCloe.bind(this);
	}

	login(username, password) {

		var csrftoken = cookie.load('csrftoken')
		fetch('/polls/login/', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then((response) => {
			if (response.status == 401 || response.status == 500) {
				// TODO: handle error
				this.setState({errorMessage:"Username or Password incorrect"})
			} else if (response.status == 200) {
				return response.json();
			}
		}).then((data) => {

			// Storing user
			auth.setCurrentUser(data);
			
			// Going to login view
			browserHistory.push('/questions');
		})
	}

	onSnackbarCloe() {
		this.setState({errorMessage : ""})
	}

	loginClick() {
		this.login(this.state.username, this.state.password)
	}

	render() {

		var loginStyle = {
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
							hintText="password" 
							type="password" 
							onChange={(event) => this.setState({password: event.target.value})}
							value={this.state.password}
						/>
					</div>
					<div>
						<RaisedButton 
							label="log in"
							style={loginStyle} 
							primary={true} 
							onClick={this.loginClick} 
							disabled={this.state.password === "" || this.state.username === ""}
							// TODO: validate email
						/>
					</div>
				</Paper>
				<Snackbar
					open={this.state.errorMessage != ""}
					message={this.state.errorMessage}
					autoHideDuration={4000}
					onRequestClose={this.onSnackbarCloe}
					bodyStyle={snackbarStyle}
				/>
			</div>
		)
	}
}

module.exports = LoginComponent;
