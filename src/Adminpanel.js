import React, { Component } from 'react';
import Axios from 'axios';


class Adminpanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			isLoaded: false,
			errorMsg: '',

		}
	}

	componentDidMount() {
		Axios.post("http://localhost:3001/getdata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({data:response.data, isLoaded:true})
	      		console.log(response);
	    	} else {
	    		this.setState({errorMsg: response})
	    	}    	
		})
	}

	render() {
		return (
			<div id='admin-panel'>
				<h1>Adminpanel</h1>
				<div className="data-section">
					{this.state.isLoaded ? this.state.data.map((item, index) => (
						<div className="data-content">	
							<div>
								<h2>ID</h2>
								<p>{item.id}</p>
							</div>
							<div>
								<h2>Name</h2>
								{item.name == '' ? <p>Anonymous</p> : <p>{item.name}</p>}
							</div>
							<div>
								<h2>Phonenumber</h2>
								{item.phonenumber == '' ? <p>Anonymous</p> : <p>{item.phonenumber}</p>}
							</div>
							<div>
								<h2>Coordinates</h2>
								<p>{item.coordinates}</p>
							</div>
							<div>
								<h2>Image</h2>
								<p>{item.img_url}</p>
							</div>
							<div>
								<h2>Image description</h2>
								{item.description == '' ? <p>No description</p> : <p>{item.description}</p>}
							</div>
							<div>
								<h2>Created at</h2>
								<p>{item.created_at}</p>
							</div>
						</div>
						))
					: <p>Loading data...</p>}
						
				</div>	 
			</div>
		);
	}
}

export default Adminpanel