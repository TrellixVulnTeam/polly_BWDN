import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ContentSend from 'material-ui/svg-icons/content/send'
import Divider from 'material-ui/Divider';
import cookie from 'react-cookie'
import _ from 'underscore'
import auth from '../Services/auth.js'

class QuestionItem extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedChoiceId: null
		}

		this.onVoteClick = this.onVoteClick.bind(this);
		this.vote = this.vote.bind(this);
		this.onChoiceChanged = this.onChoiceChanged.bind(this);
	}

	onVoteClick() {
		this.vote(this.props.question.id, this.state.selectedChoiceId, this.state.votedChoiceId);
		this.setState({isUserVoted: true,
					   votedChoiceId: this.state.selectedChoiceId});
	}

	onChoiceChanged(event, value) {
		if (this.state.votedChoiceId && this.state.votedChoiceId != value) {
			// TODO: emphasize that the user has to click on vote
		}

		this.setState({selectedChoiceId: value})
	}

	vote(questionId, choiceId, fromChoiceId) {
		var csrftoken = cookie.load('csrftoken')

		var url = 'polls/questions/' + questionId + '/vote/' + choiceId + '/';

		if (fromChoiceId && choiceId != fromChoiceId) {
			url += 'from/' + fromChoiceId + '/';
		}

		fetch(url, {
			credentials: 'include',
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken
			},
		})
	}

	componentWillMount() {

		var currentUser = auth.getCurrentUser();
		this.props.question.choice_set.map(choice => {
			if (_.contains(choice.users_voted, currentUser.id)) {
				this.setState({selectedChoiceId: choice.id,
							   votedChoiceId: choice.id,
							   isUserVoted: true});
			}
		})
	}

	getCardActions() {

		var now = new Date().getTime();
		var voteActionButton = (
			<FlatButton 
				key={"vote-" + this.props.question.id}
				label="Vote"
				labelPosition="before"
				primary={true}
				icon={<ContentSend/>}
				onClick={(event) => this.onVoteClick()}
				disabled={this.state.selectedChoiceId == null}
			>
				
			</FlatButton>);
		
		var resultsActionButton = (
			<FlatButton 
				key={"results-" + this.props.question.id}
				label="Results"
				labelPosition="before"
				primary={true}
				icon={<ContentSend/>}
			/>);
		
		var editActionButton = (
			<FlatButton 
				key={"edit-" + this.props.question.id}
				label="Update selection"
				labelPosition="before"
				primary={true}
				icon={<ContentSend/>}
				onClick={(event) => this.onVoteClick()}
				disabled={this.state.selectedChoiceId == this.state.votedChoiceId}
			/>
		)		
		
		var buttonsToRet = [];

		// Checking if to show results button
		// When the question is transparent or answering time is over
		if (this.props.question.is_transparent || new Date(this.props.question.end_date).getTime() < now) {
			buttonsToRet.push(resultsActionButton);
		}

		// Adding update or vote option
		if (new Date(this.props.question.end_date).getTime() >= now) {
			buttonsToRet.push(this.state.isUserVoted ? editActionButton : voteActionButton)
		}

		return buttonsToRet;	
	}
	
	render() {

		var radioName = "choices" + this.props.question.id;
		var radioButtonStyle = {
			margin: "3px"
		}
		var cardActionStyle = {
			textAlign: "end"
		};
		var currentUser = auth.getCurrentUser();
		return (
			<div className="question-item">
				<Card>
					<CardHeader
						title={this.props.question.question_text}
						subtitle={this.props.user_name}
						actAsExpander={true}
      					showExpandableButton={true}
					/>
					<CardText expandable={true} >
						<RadioButtonGroup 
							name={radioName}
							valueSelected={this.state.selectedChoiceId}
							onChange={(event, value) => this.onChoiceChanged(event, value)}
						>
						{
							this.props.question.choice_set.map(choice => 
									<RadioButton
									key={choice.id}
									value={choice.id}
									label={choice.choice_text}
									style={radioButtonStyle}
								/>)
						}
						</RadioButtonGroup>
					</CardText>
					<Divider />
					<CardActions expandable={true} style={cardActionStyle}>
						{
							this.getCardActions()
						}
					</CardActions>
				</Card>
			</div>
		)
	}
}

module.exports = QuestionItem;