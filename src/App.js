import React, { Component } from 'react';
import ImageUpload from './components/imageUpload.js';
import GeoLocator from './components/geoLocator.js';
import Axios from 'axios';
import $ from "jquery";

import Information from './components/information.js';
import SentOverlay from './components/sentOverlay.js';
import Adminpanel from './Adminpanel.js';

import './styles/style.css';
import logo from './images/logo.png';
import turtle from './images/turtle.png';

class App extends Component {
  constructor(props) {
  	super(props)
  	this.state={
  		url: '',
      latLong: null,
      displayMessage: false,
      showOverlay: false,
      message: '',
      messageType: ''
    };
    
    this.showOverlay = this.showOverlay.bind(this);
    this.toggleKnop = this.toggleKnop.bind(this);
  }

  toggleKnop() {
    if (this.state.hide == false) {
      this.setState({hide:true})
      const section1 = $("#section1").addClass('hidden');
      const section2 = $("#section2").removeClass('hidden');
      const section3 = $("#section3").removeClass('hidden');
    } else {
      this.setState({hide:false})
      const section1 = $("#section1").removeClass('hidden');
      const section2 = $("#section2").addClass('hidden');
      const section3 = $("#section3").addClass('hidden');
    }
  }

  urlChanged = (value) => {
  	this.setState({url:value});
  }

  coordsChanged = (value) => {
	 this.setState({latLong: value});
  }

  showOverlay() {
      $(".overlay").removeClass('hidden');
  }

  showOverlay() {
    this.setState({showOverlay: true});
  }

  hideOverlay() {
    // zet state terug naar initial via initialstate object:
    this.setState({showOverlay: false});
  }


  render() {
    return (
      <div className='app'>
        <div className='logo-section'>
          <img src={logo} className='logo' alt='Operation Cleansweep logo'/>
        </div>
        <div className="infoIcon" onClick= {this.toggleKnop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="51.214" height="46.895" viewBox="0 0 51.214 46.895">
            <g id="Group_3" data-name="Group 3" transform="translate(-338 -273)">
              <path id="Path_5" data-name="Path 5" d="M383.214,0V46.895S333.2,44.479,332,0Z" transform="translate(6 273)" fill="#00529e"/>
              <path id="iconmonstr-info-6" d="M13.883,2.314A11.569,11.569,0,1,1,2.314,13.883,11.583,11.583,0,0,1,13.883,2.314Zm0-2.314A13.883,13.883,0,1,0,27.767,13.883,13.884,13.884,0,0,0,13.883,0Zm0,6.652A1.446,1.446,0,1,1,12.437,8.1,1.448,1.448,0,0,1,13.882,6.652ZM16.2,20.825H11.569V19.668c.56-.207,1.157-.233,1.157-.85V13.65c0-.618-.6-.715-1.157-.922V11.571H15.04v7.248c0,.619.6.646,1.157.85Z" transform="translate(353.04 277.628)" fill="#fff"/>
            </g>
          </svg>
        </div>
        {this.state.showOverlay ? (<SentOverlay lat={this.state.latLong} url={this.state.url} onClose={this.hideOverlay} />) : null}
        <div className='sections'>
          <Information />
          <section className='section' id='section2'>
          <h1 className='section-title'>Pin Location</h1>
          <GeoLocator latLong={this.state.latLong} onLatLongChange={this.coordsChanged} />
          </section>
          <section className='section' id='section3'>
          <h1 className='section-title'>Add Documents</h1>
            <ImageUpload imageUrl={this.state.url} onUrlChange={this.urlChanged}/>
          </section>
        </div>
        <div className='sweep-section'>
            {this.state.url && this.state.latLong ? <button className='sweep-btn' onClick={this.showOverlay}><span className='test'>Send</span></button>: null}
            <h1 className={this.state.messageType + " " + (this.state.displayMessage ? 'alert' : '')} >{this.state.message.data}</h1>
        </div>
      </div>
    );
  }
}

export default App;
