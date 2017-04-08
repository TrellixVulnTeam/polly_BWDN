import React, { Component } from 'react';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {redA400} from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

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

	login(email, password) {
		fetch('/polls/users/login/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		}).then((response) => {
			if (response.status == 401 || response.status == 500) {
				// TODO: handle error
				this.setState({errorMessage:"Username or Password incorrect"})
			} else {
				// Going to login view
				browserHistory.push('/polls');
			}
		})
	}

	onSnackbarCloe() {
		this.setState({errorMessage : ""})
	}

	loginClick() {
		this.login(this.state.email, this.state.password)
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
				{/*<Card>*/}
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
							disabled={this.state.password === "" && this.state.emailValid}
							// TODO: validate email
						/>
					</div>
				{/*</Card>*/}
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
