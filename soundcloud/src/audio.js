import React, { Component } from 'react';

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
                <span>{this.props.name}</span>
                <button className="play btn audio-element" name={this.props.name} onClick={this.props.onClick}><i className="fa fa-play" name={this.props.name}/></button>
                <button className="pause btn audio-element" name={this.props.name} onClick={this.props.onClick}><i className="fa fa-pause" name={this.props.name}/></button>
                <audio className="audio-element" src={this.props.src} title={this.props.name}/>
            </div>
        </li>
      
    );
  }
}


export default Audio;
