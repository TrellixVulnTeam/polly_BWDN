import React, { Component } from 'react';
import QuestionItem from './QuestionItem.js'

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

	render() {

		return (
			<div>
				{
					this.state.questions.map(question =>
						<QuestionItem 
							key={question.id}
							questionText={question.question_text}
							userPublished={question.user_name}
							choicesSet={question.choice_set}
						/>
					)
				}
			</div>
		)
	}
}

module.exports = PollsView;