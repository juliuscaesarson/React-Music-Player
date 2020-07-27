import React, { Component } from 'react';
import ReactPlayer from 'react-audio-player';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        audio: [],
        name: ""
    }
    
  }

  render() {
    return (
        <li>
            <div className="audioFile">
                <div className="songName">{this.props.name.slice(0,-4)}</div>
                {/* <button className="play btn audio-element" name={this.props.name} onClick={this.props.onClick}><i className="fa fa-play" name={this.props.name}/></button>
                <button className="pause btn audio-element hidden" name={this.props.name} onClick={this.props.onClick}><i className="fa fa-pause" name={this.props.name}/></button> */}
                <ReactPlayer controls className="audio-element" src={this.props.src} title={this.props.name}/>
            </div>
        </li>
      
    );
  }
}


export default Audio;
