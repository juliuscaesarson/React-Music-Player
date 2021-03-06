import React, { Component } from 'react';

class Like extends Component {
  render() {
    // Like button 
    return (
        <div className="like" >
            <span className="numLikes">{this.props.numLikes}</span>
            <i className="fa fa-thumbs-o-up fa-2x" title={this.props.title} onClick={this.props.onClick}  />
        </div>
    );
  }
}


export default Like;

