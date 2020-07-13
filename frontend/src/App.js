import React, { Component } from 'react';
import './App.css';
import SingIn from './components/SingIn'
// import a from './components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <SingIn />
    )
    // if (localStorage.getItem('uid')) {
    //   return (<DashBoard />)
    // }
  }
}

export default App;
