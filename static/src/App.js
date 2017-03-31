import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpComponent from './SignUp/SignUpComponent.js'

class App extends Component {
  render() {
    return (
      <div className="App App-body-color">
        <div className="App-header App-primary-color">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Polly</h2>
          {/*<div className="App-intro">
            The place to make hard decisions!
          </div>*/}
        </div>
        <div className="App-body">
          <SignUpComponent />
        </div>
      </div>
    );
  }
}

export default App;
