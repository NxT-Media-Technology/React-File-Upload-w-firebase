import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class deleteByMail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			response: false,
			statusMsg: '',
		}
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search);
		Axios.post("http://localhost:3001/remove", {uuid: params.uuid})
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({response:true, statusMsg:response.data});
	    	} else {
	    		this.setState({statusMsg: response.data});
	    	}    	
		})
	}
	
	render() {
		return (
			<div>
				<h1>{this.state.response == false ? 'Handling your request...' : ''}</h1>
				<h1>{this.state.statusMsg}</h1>
			</div>
		);
	}
}

export default withRouter(deleteByMail);