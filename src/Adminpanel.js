import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';
import SweepItem from './components/sweepItem.js';
import Pagination from './components/pagination.js';

import PersonImg from './images/person.png';
import LogoIcon from './images/OCS-Icon.png';
import ListIcon from './includes/list-view-icon.svg';
import BoxIcon from './includes/box-view-icon.svg';


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

	// change page 
	const paginate = (pageNumber) => {
		this.setState({currentPage: pageNumber})
	};
	
		return (
			<div id='admin-panel'>
				<div class="admin-header">
					<img src={LogoIcon} className="logo-icon"/>
					<h1 className='upper-title'>Pending cleanup</h1>
					<img src={PersonImg} className='small-icon' />
				</div>
				<div class="admin-filters">
					<div class="admin-filter-views">
						<a href="#"><img class="activefilter" src={BoxIcon} /></a>
						<a href="#"><img src={ListIcon} /></a>
					</div>
					<div class="admin-filter-options">
						<label>Sort by:</label>
						<select>
							<option>test1</option>
							<option>test2</option>
							<option>test3</option>
						</select>
					</div>
				</div>
				<p className='status-msg'>{this.state.statusMsg}</p>

				{this.state.posts.length == 0 ? <p className='status-msg'>No data records</p> : ''}

				<div className="items">
					{/*   loop door sweepItems:	 */}
					{this.state.isLoaded ? currentPosts.map((post, index) => (
						<SweepItem post={post} updateStatus={this.updateStatus} key={post.id} />
					))
					: <p>Loading data...</p>} 	{/* <-- Als er geen posts zijn  */}

				</div>

				<div className="pagination">
				<Pagination postsPerPage={this.state.postsPerPage}  totalPosts={this.state.posts.length} paginate={paginate}    />	 
				</div>
			</div>
		);
	}
}

export default Adminpanel