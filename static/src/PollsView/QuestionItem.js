import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ContentSend from 'material-ui/svg-icons/content/send'

class QuestionItem extends Component {

	constructor(props) {
		super(props);
	}
	
	render() {

		var radioName = "choices" + this.props.key;
		var radioButtonStyle = {
			margin: "3px"
		}
		var cardActionStyle = {
			textAlign: "end"
		};
		return (
			<div>
				<Card>
					<CardHeader
						title={this.props.questionText}
						subtitle={this.props.userPublished}
						actAsExpander={true}
      					showExpandableButton={true}
					/>
					<CardText expandable={true}>
							<RadioButtonGroup name={radioName}>
							{
								this.props.choicesSet.map(choice => 
									<RadioButton
										value={choice.id}
										label={choice.choice_text}
										style={radioButtonStyle}
									/>
								)
							}
							</RadioButtonGroup>
					</CardText>
					<CardActions expandable={true} style={cardActionStyle}>
						<FlatButton 
							label="Vote"
							labelPosition="before"
							primary={true}
							icon={<ContentSend/>}
						/>
					</CardActions>
				</Card>
			</div>
		)
	}
}

module.exports = QuestionItem;