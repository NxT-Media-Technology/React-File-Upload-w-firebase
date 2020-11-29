import React, { Component } from 'react';

class ImageDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
        };
        this.handleChange = this.handleChange.bind(this);
        const desc = null;
        this.props.onDescChange(desc);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        const desc = this.state.description;
        this.props.onDescChange(desc);
        console.log("imgdesc handle change");
    }

    render() {
        return (
            <div>
                <h1 className='section-title'>Add Description</h1>
                <textarea class="description" onChange={this.handleChange} name="description" value={this.state.description} ></textarea>
            </div>
        );
    }
}

export default ImageDescription;
