import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  
  callAPI() {
    fetch("http://ec2-54-164-243-131.compute-1.amazonaws.com:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }
  
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form id="loginForm">
            <input type="text" placeholder="Enter Username" />
            <input type="password" placeholder="Enter Password" />
            <button type="submit">Login</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
