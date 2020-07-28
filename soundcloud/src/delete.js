import React, { Component } from 'react';

class Delete extends Component {
  render() {
    // Delete button 
    return (
        <div className="trash" >
            <i className="fa fa-trash fa-2x" title={this.props.title} onClick={this.props.onClick}  />
        </div>
    );
  }
}


export default Delete;

