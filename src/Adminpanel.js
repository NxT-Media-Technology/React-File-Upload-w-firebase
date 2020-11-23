import React, { Component } from 'react';
import Axios from 'axios';
import SweepItem from './components/sweepItem.js'


import './styles/adminpanel.scss';

class Adminpanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			filteredData: [],
			isLoaded: false,
			statusMsg: '',
		}
		this.updateStatus = this.updateStatus.bind(this);
	}

	componentDidMount() {
		//VRAAG ALLE DATA IN DB ZONDER DELETED ROWS
		Axios.post("http://localhost:3001/getdata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({data:response.data, isLoaded:true, totalItems: response.data.length})
	      		console.log(response);
	    	} else {
	    		this.setState({statusMsg: response})
	    	}    	
		})
	}

	updateStatus = (msg, key) => {
		//UPDATE STATUS BIJ DELETE
		this.setState({statusMsg: msg})
	}

	render() {
		return (
			<div id='admin-panel'>

				<h1 className='upper-title'>Adminpanel</h1>

				<p className='status-msg'>{this.state.statusMsg}</p>

				{this.state.data.length == 0 ? <p className='status-msg'>No data records</p> : ''}

				<div className="data-section">

					{this.state.isLoaded ? this.state.data.map((item, index) => (
						<SweepItem updateStatus={this.updateStatus} key={item.id} item={item} />
					))
					: <p>Loading data...</p>}

				</div>	 

				<div className="pagination">
					
				</div>
			</div>
		);
	}
}

export default Adminpanel