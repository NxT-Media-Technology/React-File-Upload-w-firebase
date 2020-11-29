import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import Switch from "react-switch";


class GeoLocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoAvailable: false,
      latitude: null,
      longitude: null,
      error: 'Please enable location',
      status: '',
      checked: false,
      disabled: false,
      width: 0, height: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    //Check of browser de geolocation ondersteunt
    if (navigator.geolocation) {
      this.setState({status: 'Browser supports geolocation'})
    } else {
      this.setState({status: 'Browser does not support geolocation'})
    }
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  //GET WINDOW DIMENSIONS FOR RESPONSIVE MAP
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleChange = (checked) => {
    if(checked == false)
    {
      this.setState({
        latitude: null,
        longitude: null,
        checked
      })
      const latLong = null;
      this.props.onLatLongChange(latLong);
    }
    else
    {
        navigator.geolocation.getCurrentPosition(this.getCoordinates);
        this.setState({
          checked,
          disabled: true
        });
    }
  }

  getCoordinates(position) {
    if (position.coords) {
      this.setState({error: ''});
    }
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      geoAvailable: true
    });

    if (this.state.latitude == null) {
      this.setState({error:'Could not get location'});
    }
    this.renderMap()
    //Geef de long, lat door naar de app component via de props
    const latLong = this.state.latitude + ',' + this.state.longitude;
    this.props.onLatLongChange(latLong);
  }

  renderMap() {
    if (this.state.latitude || this.state.longitude != null) {
      let latitude = this.state.latitude
      let longitude = this.state.longitude
      let windowWidth = this.state.width;
      let windowHeight = this.state.weight;
      let inLandscapeMode = false;
      let width
      let height

      //LANDSCAPE
      //console.log(windowWidth + ' ' + windowHeight)
      if (window.matchMedia("(orientation: landscape)").match) {
        inLandscapeMode = true;
      } else {
        inLandscapeMode = false;
      }
      //MOBILE
      if (windowWidth > 320 && windowWidth <= 480) {
        if (inLandscapeMode) {
          width = '30%';
          height = '30%';
        } else {
          width = '30%';
          height = '30%';
        }
      } else {
        width = '80%';
        height = '17%';
      }
      //TABLET
      if (windowWidth > 768 && windowWidth <= 1024) {
        if (inLandscapeMode) {
          width = '30%';
          height = '30%';
        } else {
          width = '100%';
          height = '100%';
        }
      } else {
        width = '100%';
        height = '100%';
      }
      //DESKTOP
      if (windowWidth > 1025) {
        width = '100%';
        height = '90%';
      }

      return <div className="map">
             <Map google={this.props.google} style={{width, height}} zoom={18} center={{
                      lat: latitude,
                      lng: longitude }}>
                <Marker position={{lat: latitude, lng: longitude}} />
              </Map>
              </div>
        }
        else
        {
          return false;
        }
  }

  render() {
    return (
      <div className="flex">
        <div className='geolocation'>
          <p>Use Current Location</p>
          <label>
            <Switch onChange={this.handleChange} checked={this.state.checked} />
          </label>
        </div>
        <div className="maps">
          <p>Maps</p>
          {this.state.checked ? this.renderMap() : null}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper ({
  apiKey: 'AIzaSyCYkd1L-4JF4J8R9EtakgQ5j2wr6GIEYkQ'
})(GeoLocator);
