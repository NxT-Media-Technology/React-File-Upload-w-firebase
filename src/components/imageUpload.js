import React, {Component} from 'react';
import {storage} from '../firebase';
import open from '../images/open.png'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      showRemoveBtn: false,
      testImg: null,
      showProgressBar: false,
      isCanceled: false
    }
  }

  handleUpload = (e) => {
      const image = e.target.files[0];
      this.setState({image: image, progress: 0});

      if(typeof(image) !== 'undefined'){
          // voeg image aan firebase storage toe:
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          const placeholderImg = document.querySelector(".open-img");
          placeholderImg.classList.add('hidden', 'preview-img');
          uploadTask.on('state_changed',(snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
              this.setState({url});
              placeholderImg.classList.remove('hidden');
              this.setState({showProgressBar: false});
              const img_name = image.name;
              this.props.onUrlChange(url, img_name);
            })
          });
          this.setState({showRemoveBtn:true, showProgressBar: true});
      }
      else
      {
        const placeholderImg = document.querySelector(".open-img");
        placeholderImg.src = open;
        this.setState({isCanceled: true })
      }
  }

  removeUpload = () => {
      const {image} = this.state;
      storage.ref('images').child(image.name).delete();
      this.setState({url:'', progress:0, showRemoveBtn:false, showProgressBar: false});
      let url = null;
      this.props.onUrlChange(url);
  }

  render() {
    const showRemoveBtn = this.state.showRemoveBtn;
    const showTxtColor = (this.state.image !== null && !this.state.isCanceled) ? 'green-text' : 'red-text';
    let button;
    
    if (showRemoveBtn) {
      button = <button onClick={this.removeUpload}>Remove</button>
    }
    else {
      button = <button onClick={this.removeUpload} style={{display:"none"}}>Remove</button>
    }    

    return (
      <div className='img-component'>
      <p>Upload Photo</p>
      <p><span className='transparant-text'>Accepted File Types : .png and .jpeg only</span></p>
      {this.state.showProgressBar ? <progress value={this.state.progress} max="100"/> : ''}
        <div className='center uploadfile'>
          <label htmlFor="file-input"><img className='open-img' src={this.state.url || open} alt="Uploaded images" height="400" width="400"/></label>
          <input id="file-input" className={(showTxtColor)} type="file" accept="image/jpeg, image/png" capture onChange={this.handleUpload}/>
        </div>
      </div>
    )
  }
}

export default ImageUpload;
