import React, { Component } from 'react';
import Switch from "react-switch";
import $ from "jquery";
import Axios from 'axios';
import Logo from './../images/logo.png';


class warningOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            send: false,
            itemAction:"testing",
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    // submitData() {
    //     console.log(this);
    //     Axios.post("http://localhost:3001/", {
    //         //something
    //     })
    //         .then((response) => {
    //         });
    // }

    render() {
        return (
            <div className="overlay completed-overlay">
                <div className="overlay-content">
                    <img src={Logo}/>
                    <br />
                    <div className="overlay-text">
                        Are you sure that you want to send this application to
                        <span> {this.state.itemAction}?</span>
                    </div>
                    <div class="overlay-buttons">
                        <a href='#'><div className="button button-green">Yes</div></a>
                        <a href='#'><div className="button button-red">No</div></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default warningOverlay;
