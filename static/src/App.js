import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpComponent from './SignUp/SignUpComponent.js'

class App extends Component {
  render() {
    return (
      <div className="App App-body-color">
        <div className="App-header App-primary-color">

          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Polly</h2>
            <h3>The place where decisions are made</h3>
          </div>
          
        </div>
        <div className="App-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
