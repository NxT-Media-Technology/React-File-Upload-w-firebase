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
	   

	render() {

		//SHORTCUT
		const itemData = this.state.itemData
		//DYNAMISCHE SHOW HIDE BTNS
		const showBtn = <button className='show-hide-details' onClick={this.toggleDetails}>Show details</button>
		const hideBtn = <button className='show-hide-details' onClick={this.toggleDetails}>Hide details</button>
		const data = this.state.itemData;
		return (
			
				<div className="item">
						<div className="item-header">
							<h3>Id: {itemData.id}</h3>
							<h3>{itemData.created_at}</h3>
						</div>	
						<div className="item-details">
					<div className="item-details-cover" >
						<img className='item-details-img' src={data.img_url} alt="Sweep picture"/>
						<div className="item-details-buttons">
							<div>button</div>
							<div>button</div>
						</div>
					</div>
					<div className="item-details-info">
						<h3>Data</h3>
						<div className="item-details-info-sec">
							<img src={PersonImg} className='small-icon'/>
							<span>{data.name == '' ? 'Anonymous' : data.name}</span>
						</div>						
						<div className="item-details-info-sec">
							<img src={PhoneImg} className='small-icon'/>
							<span>{data.phonenumber == '' ? 'Anonymous' : data.phonenumber}</span>
						</div>
							<div className="item-details-info-sec">
							<img src={LocImg} className='small-icon'/>
							<span>{data.coordinates}</span>
						</div>
					</div>
		       	</div>	   	 
						{/* <div className="action-btns">
							{this.state.itemClicked ? hideBtn : showBtn}
							<button id='delete-record' onClick={() => this.deleteRecord(itemData.id)}>Delete Record</button>
						</div> */}
				</div>
		);
	}
}

export default sweepItem