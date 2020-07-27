import React, { Component } from 'react';

class Delete extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
        <div className="trash" >
            <i className="fa fa-trash fa-2x" title={this.props.title} data-key={this.props.hash} onClick={this.props.onClick}  />
        </div>
    );
  }
}


export default Delete;

