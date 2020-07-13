import React, { Component } from 'react';
import './App.css';
import SingIn from './components/SingIn'
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
        <SingIn />
      </>
    )
  }
}

export default App;
