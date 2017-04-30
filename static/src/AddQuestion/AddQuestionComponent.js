import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

class AddQuestionComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 0
		}
	}

	render() {

		var stepIndex = this.state.stepIndex;
		return (
			<div>
				<Stepper linear={false} activeStep={stepIndex}>
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 0})}>
						Set poll settings
						</StepButton>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 1})}>
						Create choices
						</StepButton>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 2})}>
						Add participants
						</StepButton>
					</Step>
				</Stepper>
				<div>
				</div>
				<TextField 
					floatingLabelText="Question text" 
					onChange={(event) => this.setState({questionText: event.target.value})}
					value={this.state.questionText}
				/>

			</div>
		)
	}
}

module.exports = AddQuestionComponent;