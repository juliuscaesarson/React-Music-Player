import React, { Component } from 'react';

class Like extends Component {
  render() {
    // Like button 
    return (
        <div className="like" >
            <i className="fa fa-thumbs-o-up fa-2x" title={this.props.title} onClick={this.props.onClick}  />
            <span className="numLikes">{this.props.numLikes}</span>
        </div>
    );
  }
}


export default Like;

