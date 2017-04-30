import React, { Component } from 'react';
import QuestionItem from './QuestionItem.js'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';

class PollsView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			questions: []
		}

		this.loadQuestions = this.loadQuestions.bind(this);
	}

	componentDidMount() {
		this.loadQuestions();
	}

	loadQuestions() {
		fetch('polls/questions/', {
			credentials: 'include',
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (response.status == 200) {
				return response.json()
			} else {
				// TODO: handle error
			}
		}).then((data) => {
			this.setState({questions : data});
		})
	}

	addQuestionClick() {
		browserHistory.push("questions/add");
	}

	render() {

		return (
			<div>
				{
					this.state.questions.map(question =>
						<QuestionItem 
							key={question.id}
							question={question}
						/>
					)
				}

				<FloatingActionButton 
					secondary={true} 
					className="fab"
					onClick={() => this.addQuestionClick()}
				>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		)
	}
}

module.exports = PollsView;