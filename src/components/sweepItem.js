import React, { Component } from 'react';
import Axios from 'axios';
import {storage} from '../firebase';
import $, { data } from "jquery";

import PhoneImg from './../images/phone.png';
import LocImg from './../images/pin.png';
import PersonImg from './../images/person.png';
import IconSweep from './../includes/sweep-icon.svg';
import IconDelete from './../includes/delete-icon.svg';

import GeoLocator from './geoLocator.js';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class sweepItem extends Component {	
	constructor(props) {
		super(props)
		this.state = {
			
			itemData: this.props.post,
			itemClicked: false,
			url: this.props.post.img_url,
		}
		this.toggleDetails = this.toggleDetails.bind(this);
		this.showDetails = this.showDetails.bind(this);
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

	showDetails() {

		const data = this.state.itemData;
		var cord = (data.coordinates).split(",");
		var cordlat= cord[0];
		var cordlng= cord[1];
		return <div className="item-expand">
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
							<a href=""><div id="button-green" className="button">Cleaned</div></a>
							<a href=""><div id="button-red" className="button">Not Found</div></a>
						</div>
					</div>
				</div>
		
	}
	

	render() {
		//DYNAMISCHE SHOW HIDE BTNS
		const data = this.state.itemData;

		const buttonHandler = ()=> {
			console.log("test");
			return false;
		}

		return (			
			<div className="item" onClick={this.toggleDetails}>
						<div className="item-header">
							<h3>Id: {data.id}</h3>
							<h3>{data.created_at}</h3>
						</div>	
						<div className="item-details">
					<div className="item-details-cover" >
						<img className='item-details-img' src={data.img_url} alt="Sweep picture"/>
						<div className="item-details-buttons" >
							<a href="#" onClick={()=> buttonHandler()}><img src={IconSweep} alt="icon-sweep"></img></a>
							<a href="#" onClick={()=> buttonHandler()}><img src={IconDelete} alt="icon-sweep"></img></a>
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
						{this.state.itemClicked ? this.showDetails() : null}
				</div>
		);
	}
}

export default  GoogleApiWrapper({
	apiKey: 'AIzaSyCYkd1L-4JF4J8R9EtakgQ5j2wr6GIEYkQ'
})(sweepItem);