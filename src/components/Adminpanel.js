import React, { Component, useState, useEffect } from 'react';
import Axios from 'axios';
import SweepItem from './sweepItem.js';
import Pagination from './pagination.js';
import $ from "jquery";

import PersonImg from '../images/person.png';
import LogoIcon from '../images/OCS-Icon.png';
import Border from '../includes/border-header.svg';



import '../styles/adminpanel.scss';

class Adminpanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: [],
			filteredData: [],
			currentPage: 1,
			dateFilter: "latest",
			postsPerPage: 6,		
			isLoaded: false,
			statusMsg: '',
			activeNav:'Pending',
			activeView: 'list',
			activeHeader: 'header-blue',
			activeName: this.props.username
		}
		this.updateStatus = this.updateStatus.bind(this);
		this.updateNav = this.updateNav.bind(this);
		this.updateView = this.updateView.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		this.handleLogout = this.handleLogout.bind(this);

	}

	// haalt alle pending data op wanneer component aangeroepen wordt: 
	componentDidMount() {
		//VRAAG ALLE DATA IN DB ZONDER DELETED ROWS
		Axios.post("http://localhost:3001/getdata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({posts:response.data, isLoaded:true, totalItems: response.data.length})
	    	} else {
	    		this.setState({statusMsg: response})
	    	}    	
		})
	}

	getPendingData() {
		Axios.post("http://localhost:3001/getdata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({posts:response.data, isLoaded:true, totalItems: response.data.length})
	    	} else {
	    		this.setState({statusMsg: response})
	    	}    	
		})
	}

	getCleanedData() {
		Axios.post("http://localhost:3001/getcleaneddata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({posts:response.data, isLoaded:true, totalItems: response.data.length})	
	    	} else {
	    		this.setState({statusMsg: response})
	    	}    	
		})
	}

	getNotFoundData() {
		Axios.post("http://localhost:3001/getnotfounddata")
	    .then((response) => {
	    	if (response.status == 200) {
	    		this.setState({posts:response.data, isLoaded:true, totalItems: response.data.length})	
	    	} else {
	    		this.setState({statusMsg: response})
	    	}    	
		})
	}

	// @info: Returns posts by given date period. 
	getPostsByDate(date_filter) {

		let navItem = 0; 

		console.log(this.state.activeNav)

		switch(this.state.activeNav){
			case 'Pending':
				navItem = 0;
			break;
			case 'Clean':
				navItem = 1;
			break;
			case 'Not Found':
				navItem = 2;
			break;
			default:
				navItem = 0;
		}	

		Axios.post("http://localhost:3001/getPostsByDate",{
			dateFilter: date_filter,
			currentNavItem: navItem
		})
	    .then((response) => {
			console.log(response.data)
	    	if (response.status == 200) {
	    		this.setState({posts:response.data, isLoaded:true, totalItems: response.data.length})	
	    	} else {
	    		this.setState({statusMsg: response})
	    	}    	
		})
	}

	updateNav(status) {
		this.setState({activeNav: status, statusMsg: ''}, () => {
			
			$('.upper-title').html(status)

			switch(this.state.activeNav){
				case 'Pending':
					this.setState({
						activeHeader: 'header-blue'
					});
				break;
				case 'Clean':
					this.setState({
						activeHeader: 'header-green'
					});
				break;
				case 'Not Found':
					this.setState({
						activeHeader: 'header-red'
					});
				break;
				default:
					this.setState({
						activeHeader: 'header-blue'
					});		
			}
		});
	}


	
	updateView(status) {
		if(status == "block") {
			const block = $("#block");
			const rem = $(".activefilter");
			rem.removeClass("activefilter");
			block.addClass("activefilter");
		}	
		if (status == "list") {
			const block = $("#list");
			const rem = $(".activefilter");
			rem.removeClass("activefilter");
			block.addClass("activefilter");
		}	
		this.setState({activeView: status});	
	}

	updateStatus = (msg, key) => {
		//UPDATE STATUS BIJ DELETE
		this.setState({statusMsg: msg})
	}



	// update select filter:
	updateFilter = (event) => {
		console.log(event.target.value);
		this.setState({dateFilter: event.target.value});
		this.getPostsByDate(event.target.value); 

	};

	handleLogout() {
		this.props.pass(false);
		console.log("logout");
	}

	render() {


	
		/* PAGINATION */ 
	const indexofLastPost = this.state.currentPage * this.state.postsPerPage;
	const indexOfFirstPost = indexofLastPost - this.state.postsPerPage;
	let currentPosts = '';

		if(this.state.posts){
			currentPosts = this.state.posts.slice(indexOfFirstPost, indexofLastPost);
		}

	// change page 
	const paginate = (pageNumber) => {
		this.setState({currentPage: pageNumber})

	// End of pagination settings. 
	};


	
		return (
			<div id='admin-panel'> 
			<div className="admin-container">
				<div className="admin-header">
					<a href="/adminpanel"><img src={LogoIcon} className="logo-icon" /></a>
					<h1 className='upper-title'>Pending cleanup</h1>
					<div className="header-account">
						<img src={PersonImg} className='small-icon' />
						<div>
							<span>{this.state.activeName}</span>
							<a onClick={this.handleLogout}>Logout</a>
						</div>
					</div>
				</div>
				<div class="admin-filters">
					<div class="admin-filter-views">
						<a onClick={()=>this.updateView("block")} href="#">
							<svg id="block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path id="iconmonstr-view-6" d="M11,11H0V0H11Zm13,0H13V0H24ZM11,24H0V13H11Zm13,0H13V13H24Z" fill="gray"  />
							</svg>
						</a>
						<a onClick={()=>this.updateView("list")} href="#">
							<svg id="list" class="activefilter" xmlns="http://www.w3.org/2000/svg" width="27.601" height="24" viewBox="0 0 27.601 24">
								<path id="iconmonstr-menu-2" d="M4.6,26H0V21.2H4.6Zm0-14.4H0v4.8H4.6ZM4.6,2H0V6.8H4.6ZM8.05,2V6.8H27.6V2Zm0,14.4H27.6V11.6H8.05Zm0,9.6H27.6V21.2H8.05Z" transform="translate(0 -2)" fill="gray" />
							</svg>
						</a>
					</div>
					<div class="admin-filter-options">
						<label>Sort by:</label>


						<select onChange={this.updateFilter} value={this.state.dateFilter}>
							<option onChange={this.updateFilter} value="Latest">Latest</option>
							<option onChange={this.updateFilter} value="Oldest">Oldest</option>
							<option onChange={this.updateFilter} value="This-month">This-month</option>
						</select>
					</div>
				</div>
				<p className='status-msg'>{this.state.statusMsg}</p>

				{this.state.posts.length == 0 ? <p className='status-msg'>No data records</p> : ''}

				<div className={this.state.activeView == "block" ? "block-view": "list-view"}>
					{/*   loop door sweepItems:	 */}
					{this.state.isLoaded ? currentPosts.map((post, index) => (
						<SweepItem itemState ={this.state.activeHeader} post={post} updateStatus={this.updateStatus} activeNav={this.state.activeNav}key={post.id} />
					))
					: <h1 className="center">Loading data...</h1>} 	{/* <-- Als er geen posts zijn  */}

				</div>
							
				<div className="navbar">
					<div className={this.state.activeNav== "Pending" ? "activenav nav-item" :"nav-item"} onClick= {()=> {this.updateNav("Pending"); this.getPendingData()}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24.715" height="37.073" viewBox="0 0 24.715 37.073">
							<path id="iconmonstr-time-14" d="M26.418,11a9.74,9.74,0,0,0,2.3-6.234V0H4V4.762A9.728,9.728,0,0,0,6.3,11l4.767,5.685a2.752,2.752,0,0,1,.014,3.562L6.243,26.1A9.744,9.744,0,0,0,4,32.274v4.8H28.715v-4.8a9.741,9.741,0,0,0-2.244-6.17l-4.835-5.861a2.752,2.752,0,0,1,.014-3.562L26.418,11Zm-7.166,11.21,4.835,5.861a6.655,6.655,0,0,1,1.539,4.372H7.089a6.637,6.637,0,0,1,1.539-4.37l4.833-5.859a5.874,5.874,0,0,0-.029-7.514L8.665,9.01A6.634,6.634,0,0,1,7.089,4.633H25.626A6.646,6.646,0,0,1,24.05,9.01l-4.769,5.685a5.876,5.876,0,0,0-.029,7.512Z" transform="translate(-4)" fill="#bcbec5" />
						</svg>
						<label>Pending</label>
					</div>
					<div className={this.state.activeNav == "Clean" ? "activenav nav-item" : "nav-item"} onClick={() => {this.updateNav("Clean"); this.getCleanedData()}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="39" height="38.952" viewBox="0 0 39 38.952">
							<g id="_6768c03c3e3cb92f67ae876c4a8c74f1" data-name="6768c03c3e3cb92f67ae876c4a8c74f1" transform="translate(0 4)">
								<path id="Path_14" data-name="Path 14" d="M35.783,40.173a24.5,24.5,0,0,1-3.16,5.44c.493.115.967.243,1.445.33.875.159,1.755.283,2.626.442a.51.51,0,0,0,.585-.279,46.021,46.021,0,0,0,4.365-8.317c.466-1.138.864-2.3,1.293-3.458.044-.115.088-.235.139-.374.943.326,1.862.641,2.825.975-.171.505-.33.983-.5,1.456a50.844,50.844,0,0,1-5.647,11.405c-.2.294-.426.573-.621.868a1.837,1.837,0,0,1-1.874.816,34.352,34.352,0,0,1-8.878-2.065,30.8,30.8,0,0,1-13.267-9.3,1.529,1.529,0,0,1-.271-1.7,1.465,1.465,0,0,1,1.417-.864,22.8,22.8,0,0,0,7.847-1.536,14.084,14.084,0,0,0,5.973-3.956c.466-.549.844-1.17,1.281-1.787l2.614,1.472c-.485.7-.915,1.4-1.425,2.045a14.932,14.932,0,0,1-4.541,3.725,25.352,25.352,0,0,1-8.385,2.77c-.06.008-.115.02-.259.048.422.386.776.744,1.166,1.063.732.593,1.472,1.17,2.232,1.723a.8.8,0,0,0,.589.111,8.6,8.6,0,0,0,4.055-2.018,11.761,11.761,0,0,1-2.392,3.363c.84.418,1.691.788,2.483,1.25a3.118,3.118,0,0,0,3.012,0A18.147,18.147,0,0,0,35.071,40.8c.227-.195.446-.394.712-.629Zm11.023-7.756L32.52,26.062a4.414,4.414,0,0,1,1.85-2.109,4.571,4.571,0,0,1,4.346-.271c1.906.832,3.812,1.667,5.7,2.543A4.645,4.645,0,0,1,47,31.86c-.052.179-.123.354-.2.557ZM44.685,24.1c-1.5-.669-2.989-1.329-4.469-1.994a.453.453,0,0,1-.1-.088c.056-.111.107-.227.167-.334q2.788-5.229,5.575-10.454a1.109,1.109,0,0,1,1.341-.661,2.363,2.363,0,0,1,1.536.836,1.01,1.01,0,0,1,.183,1.066q-2.083,5.724-4.147,11.457c-.02.044-.048.088-.092.171ZM22.014,27.777a3.755,3.755,0,1,1-3.7-3.816,3.784,3.784,0,0,1,3.7,3.816ZM12.26,16.463a2.248,2.248,0,0,1,0,4.5A2.275,2.275,0,0,1,10,18.708a2.25,2.25,0,0,1,2.26-2.244Zm5.261,2.993a1.5,1.5,0,1,1,3,.016,1.526,1.526,0,0,1-1.492,1.484,1.5,1.5,0,0,1-1.5-1.5Z" transform="translate(-10 -14.54)" fill="#bcbec5" />
							</g>
						</svg>
						<label>Clean</label>
					</div>
					<div className={this.state.activeNav == "Not Found" ? "activenav nav-item" : "nav-item"} onClick={() => {this.updateNav("Not Found"); this.getNotFoundData()}}>
						<svg id="Component_36_1" data-name="Component 36 – 1" xmlns="http://www.w3.org/2000/svg" width="37.012" height="37.333" viewBox="0 0 37.012 37.333">
							<g id="iconmonstr-magnifier-2">
								<path id="iconmonstr-magnifier-2-2" data-name="iconmonstr-magnifier-2" d="M37.012,33.672l-9.646-9.652a15.133,15.133,0,1,0-3.711,3.61l9.7,9.7,3.659-3.662ZM4.437,15.136a10.691,10.691,0,1,1,10.691,10.7,10.706,10.706,0,0,1-10.691-10.7Z" fill="#bcbec5" />
							</g>
							<path id="iconmonstr-x-mark-1" d="M12,10.094,7.842,5.99l4.1-4.141L10.094,0,5.988,4.159,1.833.058,0,1.891,4.16,6.01l-4.1,4.156L1.89,12,6.009,7.841l4.142,4.1Z" transform="translate(9.11 9.239)" fill="#bcbec5" />
						</svg>
						<label>Not found</label>
					</div>
				</div>
				{/* background of active navitem in navbar */}
				<div className="navbarbg">
					<div className={this.state.activeNav == "Pending" ? "activenav nav-item" : "nav-item hidden"}>
						<img className="activenav" src={Border}/>
					</div>
					<div className={this.state.activeNav == "Clean" ? "activenav nav-item" : "nav-item hidden"} >						
						<img className="activenav" src={Border}/>
					</div>
					<div className={this.state.activeNav == "Not Found" ? "activenav nav-item" : "nav-item hidden"}>						
						<img className="activenav" src={Border}/>
					</div>
				</div>
				<div className="pagination">
				<Pagination postsPerPage={this.state.postsPerPage}  totalPosts={this.state.posts.length} paginate={paginate}    />	 
				</div>
				</div>
				<span id="whitebg"></span>
			</div>
		);
	}
}

export default Adminpanel