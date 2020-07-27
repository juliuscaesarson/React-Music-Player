import React, { Component } from 'react';

class Delete extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
        <div className="trash" >
            <i className="fa fa-trash" name={this.props.name} onClick={this.props.onClick} />
        </div>
    );
  }
}


export default Delete;

