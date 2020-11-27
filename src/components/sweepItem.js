import React, { Component } from 'react';
import Axios from 'axios';
import {storage} from '../firebase';
import $ from "jquery";

import BellImg from './../images/bell.png';
import PhoneImg from './../images/phone.png';
import LocImg from './../images/pin.png';
import PersonImg from './../images/person.png';

class sweepItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
			itemData: this.props.post,
			itemClicked: false,
			url: this.props.post.img_url,
		}
		this.toggleDetails = this.toggleDetails.bind(this);
		this.renderDetails = this.renderDetails.bind(this);
		this.deleteRecord = this.deleteRecord.bind(this);
	}

	deleteRecord(record_id) {
		//DATABASE SOFTDELETE
		Axios.post("http://localhost:3001/deleteRecord", {id: record_id}).then((response) => {
			console.log(response.data)
			//UPDATE STATUS MSG
			this.props.updateStatus(response.data);

			//REMOVE FROM LIST
			const id = record_id
			$('#' + id).fadeOut(1000)
		})
	}

	toggleDetails() {
		if (this.state.itemClicked == false) {
			this.setState({itemClicked: true})
		} else {
			this.setState({itemClicked: false})
		}
	}
	   
	renderDetails() {
		const data = this.state.itemData
		//RENDER EXTRA DETAILS
		return <div className="data-box-details">
					<div className="sweep-text">
						<img src={PersonImg} className='small-icon'/>
						{data.name == '' ? 'Anonymous' : data.name}
						<p></p>
						<img src={PhoneImg} className='small-icon'/>
						{data.phonenumber == '' ? 'Anonymous' : data.phonenumber}
						<p></p>
						<img src={LocImg} className='small-icon'/>
						{data.coordinates}
					</div>
					<div className="sweep-img">
						<img className='sweep-img' src={data.img_url} alt="Sweep picture"/>
					</div>
		       	</div>	   	   		 
	}

	render() {
		//SHORTCUT
		const itemData = this.state.itemData
		//DYNAMISCHE SHOW HIDE BTNS
		const showBtn = <button className='show-hide-details' onClick={this.toggleDetails}>Show details</button>
		const hideBtn = <button className='show-hide-details' onClick={this.toggleDetails}>Hide details</button>

		return (

	
			<div id={itemData.id}>
				<div className="data-box">
					<div className="box-header">
					    <img id='bell-img' src={BellImg} alt="Bell"/>
						<h3>{itemData.id}</h3>
					</div>

					<div className="sweep-date">
						<h3>{itemData.created_at}</h3>
					</div>
	
					{this.state.itemClicked ? this.renderDetails() : ''}

					<div className="action-btns">
						{this.state.itemClicked ? hideBtn : showBtn}
						<button id='delete-record' onClick={() => this.deleteRecord(itemData.id)}>Delete Record</button>
					</div>
				</div>
			</div>
		
		);
	}
}

export default sweepItem