import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Login from './login';
import Home from './home';

class App extends Component {
  constructor() {
    super();
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    this.state = ({
      user: null
      
    });
    this.authListener = this.authListener.bind(this);
    
  }

  componentDidMount() {
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    this.authListener();

  }

  authListener() {
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
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
        {this.state.user ? (<Home/>) : (<Login />) }
      </div>
      
    );
  }
}


export default App;
