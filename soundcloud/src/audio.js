import React, { Component } from 'react';
import ReactPlayer from 'react-audio-player';

class Audio extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (    
        <div className="player">
            <ReactPlayer controls className="audio-element" src={this.props.src} title={this.props.title}/>
        </div>

      
    );
  }
}


export default Audio;
