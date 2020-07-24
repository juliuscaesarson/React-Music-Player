import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      users: [],

    };
      
  }
  
  callAPI() {
    fetch("http://ec2-54-164-243-131.compute-1.amazonaws.com:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  callUsers() {
    fetch('http://ec2-54-164-243-131.compute-1.amazonaws.com:9000/getUsers')
    .then(res => res.json())
    .then(res => this.setState({ users: res.users }))
    .then(res => console.log(this.state.users))
    .catch(err => console.log(err));
  }
  
  componentWillMount() {
    this.callAPI();
    this.callUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.apiResponse}
          <div id="login-container" className="login-container">
                <input type="text" placeholder="Username" id="username" />
                <input type="password" placeholder="Password" id="password" />
                <button className="btn-secondary" id="login">Login</button>
                <button className="btn-secondary" id="register">Register</button>
                
          </div>
          <h1>Users</h1>
          {/* {this.state.users.map(user =>
            <div>{user.username}</div>
          )} */}

        </header>
      </div>
    );
  }
}

export default App;
