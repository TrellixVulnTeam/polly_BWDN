import React, { Component } from 'react';
import '../App.css';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { white } from 'material-ui/styles/colors';

class Menu extends Component {

	constructor(props) {
		super(props);

		this.logoutClick = this.logoutClick.bind(this);
	}

	logoutClick() {
		fetch('polls/users/logout/', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (response.status == 200) {
				
				browserHistory.push('/login');
			} 
		});
	}

	render() {
		return (
			<IconMenu
				iconButtonElement={
					<IconButton><MoreVertIcon color={white} /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				<MenuItem 
					primaryText="Log out"
					onClick={this.logoutClick}
				/>
			</IconMenu>
		)
	}
}

class MainFrameComponent extends Component {

	render() {

		var contentStyle = {
			position: "relative",
			padding: "0px 20px"
		};

		return (
			<div>
				<AppBar
    				title="Polly"
          			iconElementRight={<Menu />}
				/>

				<div style={contentStyle}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

module.exports = MainFrameComponent;