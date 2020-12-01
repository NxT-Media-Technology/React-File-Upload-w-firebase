import React, { Component } from 'react';
import Axios from 'axios';
import {storage} from '../firebase';
import $, { data } from "jquery";

import PhoneImg from './../images/phone.png';
import LocImg from './../images/pin.png';
import PersonImg from './../images/person.png';
import IconSweep from './../includes/sweep-icon.svg';
import IconDelete from './../includes/delete-icon.svg';
import DescIcon from './../includes/desc-icon.svg';

import GeoLocator from './geoLocator.js';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class sweepItem extends Component {	
	constructor(props) {
		super(props)
		this.state = {
			
			itemData: this.props.post,
			itemClicked: false,
			url: this.props.post.img_url,			
			headerColor:"header-blue",
		}
		this.toggleDetails = this.toggleDetails.bind(this);
		this.showDetails = this.showDetails.bind(this);
	}
	

	deleteRecord(record_id) {
		//DATABASE SOFTDELETE
		Axios.post("http://localhost:3001/deleteRecord", {id: record_id}).then((response) => {
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

	showDetails() {

		const data = this.state.itemData;
		var cord = (data.coordinates).split(",");
		var cordlat= cord[0];
		var cordlng= cord[1];
		return <div className="item-expand">
			<div className="item-details-info-mobile">
						<h3>Data</h3>
						<div className="item-details-info-sec">
							<img src={PersonImg} className='small-icon' />
							<span>{data.name == '' ? 'Anonymous' : data.name}</span>
						</div>
						<div className="item-details-info-sec">
							<img src={PhoneImg} className='small-icon' />
							<span>{data.phonenumber == '' ? 'Anonymous' : data.phonenumber}</span>
						</div>
						<div className="item-details-info-sec-desc">
							<img src={DescIcon} className='small-icon' />
							{/* show the full description when you show details, else show part of desc */}
					<div>{this.state.itemClicked ? (data.img_description ? (data.img_description) : "No description") : (data.img_description ? (data.img_description).substring(0, 10) + "..." : "No description")}</div>
						</div>
					</div>
					<div className="item-location">
						<h3>Location:</h3>
							<span>coordinates: {this.state.itemData.coordinates}</span>
							<div className="map">
								<Map google={this.props.google} style={{ width:"100%", height:"100%" }} zoom={18} center={{
									lat: cordlat,
									lng: cordlng
								}}>
									<Marker position={{ lat: cordlat, lng: cordlng }} />
								</Map>
							</div>
						<div className="item-buttons" >
					<a href="#"><div className="button button-green">Cleaned</div></a>
					<a href="#"><div className="button button-red">Not Found</div></a>
						</div>
						<div className="item-shrink" onClick={this.toggleDetails}>
							<svg xmlns="http://www.w3.org/2000/svg" width="26.637" height="13.318" viewBox="0 0 26.637 13.318">
								<path id="arrow" d="M13.318,13.318,0,0H26.637Z" transform="translate(26.637 13.318) rotate(180)" fill="#bcbec5" />
							</svg>
						</div>
					</div>
				</div>
		
	}
	

	render() {
		//DYNAMISCHE SHOW HIDE BTNS
		const data = this.state.itemData;	
		return (			
			<div className="item">
						<div className={this.state.headerColor + " item-header"} onClick={this.toggleDetails}>
							<h3>Id: {data.id}</h3>
							<h3>{data.created_at}</h3>
						</div>	
						<div className="item-details">
					<div className="item-details-cover" >
						<img className='item-details-img' src={data.img_url} alt="Sweep picture"/>
						<div className="item-details-buttons" >
							<a href="#" ><img src={IconSweep} alt="icon-sweep"></img></a>
							<a href="#"><img src={IconDelete} alt="icon-sweep"></img></a>
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
							<img src={DescIcon} className='small-icon'/>
							{/* show the full description when you show details, else show part of desc */}
							<div>{this.state.itemClicked ? (data.img_description ? (data.img_description) : "No description") : (data.img_description ? (data.img_description).substring(0, 25) + "..." : "No description")}</div>
						</div>
					</div>
		       	</div>	   	 
						{this.state.itemClicked ? this.showDetails() : null}
				</div>
		);
	}
}

export default  GoogleApiWrapper({
	apiKey: 'AIzaSyCYkd1L-4JF4J8R9EtakgQ5j2wr6GIEYkQ'
})(sweepItem);