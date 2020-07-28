import React, { Component } from 'react';

class Liked extends Component {
  render() {
    // Liked button 
    return (
        <div className="like" >
            <span className="numLikes">{this.props.numLikes}</span>
            <i className="fa fa-thumbs-up fa-2x" title={this.props.title} onClick={this.props.onClick}  />
        </div>
    );
  }
}


export default Liked;

