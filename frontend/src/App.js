import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn'
import DashBoard from './components/DashBoard';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    if (localStorage.getItem('uid')) {
      return (<DashBoard />)
    }
    return (
      <>
        <SignIn />
      </>
    )
  }
}

export default App;
