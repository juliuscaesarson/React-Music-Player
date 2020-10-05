import React, { Component } from 'react';
import fire from './config/fire';

class Login extends Component {
  constructor(props) {
    super(props);
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email:'',
      password:''
    }
  }

  handleChange(e) {
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
      alert("Email or Password is incorrect");
    })
  }

  signup(e){
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      alert("Please enter email and password to sign up");

    }
    else {
      // Followed firebase authentication tutorial at https://www.youtube.com/watch?v=r4EsP6rovwk
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{
        console.log(u);
      })
      .catch((error) => {
          alert(error.message);
      })
    }
    
  } 

  render() {
    return (
       <div className="col-md-10">
          <form>
            <h2>Login</h2>
            <div className="form">
              <label htmlFor="emailInput">Email Address </label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="emailInput" />
            </div>
            <div className="form">
              <label htmlFor="passInput">Password </label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="passInput" />
            </div>
            <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
          </form>
 

          <form>
            <h2>Register</h2>
            <div className="form">
              <label htmlFor="emailInput">Email Address </label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="emailInput" />
            </div>
            <div className="form">
              <label htmlFor="passInput">Password </label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="passInput" />
            </div>
            <button onClick={this.signup} className="btn btn-success">Register</button>
          </form>

        </div>
    );
  }
}


export default Login;
