import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Login from './login';
import Home from './home';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});

      }
      else {
        this.setState({user: null});
      }
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.user ? (<Home />) : (<Login />) }
      </div>
    );
  }
}


export default App;
