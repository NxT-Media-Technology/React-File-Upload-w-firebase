import React, { Component } from 'react';

class accountOptions extends Component {

    render() {
        return (
            <div className="component-accountoptions overlay overlay-component-accountoptions">
                <div className="component-accountoptions-container overlay-accountoptions">
                <h1>{this.props.activeName}</h1>
                    <a onClick={this.props.toggleAccount}>Close X</a>
                    <a onClick={this.props.handleLogout}>Logout</a>
                    <a onClick={this.props.toggleRegister }>Register</a>
                    {/* <a onClick={this.props.toggleRegister }>Register</a> */}
                </div>
            </div>
        );
    }
}

export default accountOptions;