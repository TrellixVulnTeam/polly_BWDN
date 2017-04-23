import cookie from 'react-cookie';
import _ from 'underscore'

module.exports = {
	send: function(url, params) {
		var csrftoken = cookie.load('csrftoken')
		var defaultHeaders = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken
		}
		return fetch(url, _.extend(params, defaultHeaders))
	}
}