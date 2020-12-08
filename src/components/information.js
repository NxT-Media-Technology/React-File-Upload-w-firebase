import React, {Component} from 'react';
import turtle from '../images/home-image.jpg';
import {
  isBrowser,
  isMobile,
  isTablet
} from "react-device-detect";

class Information extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hide:false
    }
  }

  componentDidMount() {
    if(isMobile) {
      this.setState({hide:true});
    }
    if(isTablet) {
      this.setState({hide:true});
    }
    if(isBrowser) {
      this.setState({hide:false});
    }
    else {
      return;
    }
  }

  render() {
    return(
      <section className={'section '+ ((this.state.hide) ? "hidden" : "")} id="section1" >
        <h1 className='section-title'>Info</h1>
        <p> The Zero Pellet Loss App has been created by the plastics industry and its value chain in Antwerp.</p>
        <p> Users can anonymously report accidental plastic pellet loss on the roads of the Port, by notifying the localization of the leakage, with the possibility of sharing a picture through the App. The competent service for a remedial cleaning is being notified accordingly.</p>
        <p> This initiative goes beyond the Operation Clean Sweep® programme, the international volunaty programme of the plastijcs industry to prevent accidental plastics pellet loss during their handling along the value chain.
         The Zero Pellet Loss App does not collect private information from its users.</p>
        <div>
          <p className="section-small"> Initiated by: essenscia, PlasticsEurope, Voka - Alfaport and Port of Antwerp <br/>
          Supported by: Febetra, TLV
          </p>
          <p className="section-small">
            Hosted by PlasticsEurope aisbl
          </p>
        </div>       
        <h1 className='section-title'>Website</h1>
        <p><a href="http://www.opcleansweep.eu/">http://www.opcleansweep.eu/</a></p>
          <img className="center" src={turtle} id='info-img' alt='Ocean turtle'/>
      </section>
      )
    }
  }

export default Information;
