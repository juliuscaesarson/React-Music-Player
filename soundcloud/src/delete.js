import React, { Component } from 'react';

class Delete extends Component {
  render() {
    return (
        <div className="trash" >
            <i className="fa fa-trash fa-2x" title={this.props.title} id={this.props.id} onClick={this.props.onClick}  />
        </div>
    );
  }
}


export default Delete;

