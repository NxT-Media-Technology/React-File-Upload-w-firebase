import React, { Component } from 'react';
import Switch from "react-switch";
import $ from "jquery";
import Axios from 'axios';

class SentOverlay extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      send:false,
      checked:false,
      disabled:false,
      name:"",
      number:"",
      displayMessage: false,
      message: '',
      messageType: '',
      url: props.url,
      img_name: props.imgName,
      description: props.description,
      latLong: props.lat,
      displayform: true
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.submitData = this.submitData.bind(this);
  }

  handleChange = (checked) => {
    this.setState({
      checked,
      disabled: true
     });
  }

  handleChange = (e) => {
    this.setState({
    [e.target.name]: e.target.value
    });
  }

  handleCheckboxChange = (checked) => {
    if(!checked)
    {
      this.setState({
        checked,
        disabled:false
      });
    }
    else
    {
      this.setState({
        checked,
        disabled:true,
        name:"",
        number:""
      });
    }
  }

  // submitData () {
  //     console.log(this);
  //     Axios.post("http://localhost:3001/post", {
  //     img_url: this.state.url,
  //     img_description:this.state.description,
  //     imgName: this.state.img_name,
  //     coordinates: this.state.latLong,

      
  //     // anonymous: this.state.checked,
  //     // name: this.state.name,
  //     // number: this.state.number,



  //   })
  //   .then((response) => {
  //     this.setState({ displayMessage: true, message: response});
  //     if(!this.state.message.data.includes('Error'))
  //     {
  //       this.setState({ messageType: 'success'});
  //       $(".overlay").removeClass('hidden');
  //       $(".overlay-form").addClass('hidden');
  //       $(".closeBtn").removeClass('hidden');
  //     }
  //     else
  //     {
  //       this.setState({ messageType: 'error'});
  //     }
  //   });
  // }

  render() {
    return (
      <div className="overlay completed-overlay">        
        <div className="overlay-content">
        <p className="overlay-text">Thank you for helping this cause.</p>


        
        {/* <form class="overlay-form">
          <label>Name</label>
          <input onChange={this.handleChange} className={(this.state.disabled) ? "disabled" : ""}  type="text" name="name" value={this.state.name}/>
          <label>Telephone number</label>
          <input onChange={this.handleChange} className={(this.state.disabled) ? "disabled" : ""} type="text" name="number" value={this.state.number}/>
          <label name="switch">I would like to stay anonymous</label>
          <Switch className="overlay-switch" onChange={this.handleCheckboxChange} checked={this.state.checked} />
          <span className={this.state.messageType + " " + (this.state.displayMessage ? 'alert' : '')}>{this.state.message.data}</span>
        </form> */}
        {/* <a><div onClick={this.submitData} className="overlay-button">Continue</div></a> */}

          <a href='.'><div className="closeBtn overlay-button">Close</div></a>
        </div>
      </div>
    )
  }
}

export default SentOverlay;
