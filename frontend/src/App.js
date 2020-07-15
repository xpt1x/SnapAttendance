import React, { Component } from 'react';
import './App.css';
import SingIn from './components/SingIn'
import DashBoard from './components/DashBoard';
import SubjectDetail from './components/SubjectDetail';
import data from './response/response.json';

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
        <SubjectDetail subject={data[0]} />
      </>
    )
  }
}

export default App;
