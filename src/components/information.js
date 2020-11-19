import React, {Component} from 'react';
import turtle from '../images/turtle.png';
import {
  BrowserView,
  MobileView,
  TabletView,
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
        <p> The Operation Clean Sweep® (OCS) program and
            manual contain guidelines to help plastics industry
            operations.</p>
        <p> Managers reduce the accidental loss of pellets, flakes
            and powder from the processing facility into the
            environment.</p>
        <p> Globally, abatement of pellet, flake and powder loss
            has been included in the “Declaration of Solutions for
            Marine Litter” to help industry’s role in addressing marine litter.</p>
        <p> We encourage companies to join other similar
            companies globally by signing the Declaration and by adopting
            the OCS program.</p>
        <h1 className='section-title'>Website</h1>
        <p><a href="http://www.opcleansweep.eu/">http://www.opcleansweep.eu/</a></p>
          <img className="center" src={turtle} id='turtle-img' alt='Ocean turtle'/>
      </section>
      )
    }
  }

export default Information;
