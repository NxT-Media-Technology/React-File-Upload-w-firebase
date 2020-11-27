import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';
import SweepItem from './components/sweepItem.js';
import Pagination from './components/pagination.js';




import './styles/adminpanel.scss';

class Adminpanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: [],
			filteredData: [],
			currentPage: 1,
			postsPerPage: 6,		
			isLoaded: false,
			statusMsg: '',
		}
		this.updateStatus = this.updateStatus.bind(this);
	}

	// haalt alle data op wanneer component aangeroepen wordt: 
	componentDidMount() {
		//VRAAG ALLE DATA IN DB ZONDER DELETED ROWS
		Axios.post("http://localhost:3001/getdata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({posts:response.data, isLoaded:true, totalItems: response.data.length})
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
	
		/* PAGINATION */ 
	const indexofLastPost = this.state.currentPage * this.state.postsPerPage;
	const indexOfFirstPost = indexofLastPost - this.state.postsPerPage;
	const currentPosts = this.state.posts.slice(indexOfFirstPost, indexofLastPost);


	console.log(this.state.postsPerPage)
	console.log(this.state.posts.length)
	


		return (
			<div id='admin-panel'>

				<h1 className='upper-title'>Adminpanel</h1>

				<p className='status-msg'>{this.state.statusMsg}</p>

				{this.state.posts.length == 0 ? <p className='status-msg'>No data records</p> : ''}

				<div className="data-section">

					{/*   loop door sweepItems:	 */}
					{this.state.isLoaded ? currentPosts.map((post, index) => (
						<SweepItem post={post} updateStatus={this.updateStatus} key={post.id} />
					))
					: <p>Loading data...</p>}

				</div>

				<div className="pagination">
				<Pagination PostsPerPage = {this.state.postsPerPage}  totalPosts = {this.state.posts.length}     />	 
				sakldfasdfal;sdfklj
				</div>
			</div>
		);
	}
}

export default Adminpanel