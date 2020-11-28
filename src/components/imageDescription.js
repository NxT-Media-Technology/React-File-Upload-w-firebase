import React, { Component } from 'react';

class ImageDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: null,
        };
    }
    descChanged = (value) => {
      this.setState({description: value});
        this.props.onDescChange(value);
    }

    render() {
        return (
            <div>
                        <h1 className='section-title'>Add Description</h1>
                        <textarea class="description" onChange={this.descChanged} ></textarea>
                </div>
        );
    }
}

export default ImageDescription;
