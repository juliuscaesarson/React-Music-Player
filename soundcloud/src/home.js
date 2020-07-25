import React, { Component } from 'react';
import fire from './config/fire';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={this.logout} className="btn btn-success">Logout</button>
        </div>
    );
  }
}


export default Home;
