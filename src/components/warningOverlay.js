import React, { Component } from 'react';
import $ from "jquery";
import Axios from 'axios';


class warningOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: this.props.warning,
            itemAction: this.props.warningType,
            itemId: this.props.itemId,            
            actioncolor:"blue",
            actionName: null,
        }
    }

    updateStatus = (msg, key) => {
		this.setState({statusMsg: msg});
    }
    
    componentDidMount()  {
        switch(this.state.itemAction){
            case "delete":
                this.setState({
                    actioncolor: "green",
                    actionName:"Cleaned"
                });
                break;
            case "notfound":
                this.setState({
                    actioncolor: "red",
                    actionName:"Not Found"
                });
                break;
             default:                
                this.setState({
                 actioncolor: "blue",
                 actionName:"UNKNOWN"
                });
                break;
        }
    }

    handleItem(record_id) {
        switch(this.state.itemAction) {
            case "delete":
                Axios.post("http://localhost:3001/deleteRecord", {id: record_id}).then((response) => {
                this.updateStatus(response.data);
                const id = record_id
                $('#' + id).fadeOut(1000)
                })
                break;
            case "notfound":
                Axios.post("http://localhost:3001/notfoundrecord", {id: record_id}).then((response) => {
                this.updateStatus(response.data);
                const id = record_id
                $('#' + id).fadeOut(1000)
                })
                break;
            default:                
                break;
        }
    }

    handleClick() {
        this.setState({
            warning: !this.state.warning

        });
    }

    render() {
        const id = this.state.itemId;
        return (
            <div className="overlay completed-overlay">
                {this.actioncolor}
                <div className="overlay-content">
                    <div className="overlay-text">
                        Are you sure that you want to send this report to
                        <span className= {this.state.actioncolor}> {this.state.actionName}?</span>
                    </div>
                    <div class="overlay-buttons">
                        <a href="#" onClick = {()=> this.handleItem(id)} ><div className="button button-green">Yes</div></a>
                        <a href='#'onClick = {this.props.handleClick}><div className="button button-red">No</div></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default warningOverlay;
