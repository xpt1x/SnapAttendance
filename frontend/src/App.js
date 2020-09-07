import React, { Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import SignIn from './components/SignIn'
import DashBoard from './components/DashBoard';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: {}
    }
  }

  changeTheme = () => {
    if(this.state.theme.palette.type === 'light'){
      localStorage.setItem('theme', JSON.stringify({
        palette: {
          type: 'dark',
        },
      }))
    }
    else{
      localStorage.setItem('theme', JSON.stringify({
        palette: {
          type: 'light',
        },
      }))
    }
    this.globalTheme = createMuiTheme(JSON.parse(localStorage.getItem('theme')))
    this.setState({
      theme: JSON.parse(localStorage.getItem('theme'))
    })    
  }

  componentWillMount(){
    if(!localStorage.getItem('theme')){
      localStorage.setItem('theme', JSON.stringify({
        palette: {
          type: 'light',
        },
      }))
      this.setState({
        theme: JSON.parse(localStorage.getItem('theme'))
      })
    }
    else{
      this.globalTheme = createMuiTheme(JSON.parse(localStorage.getItem('theme')))
      this.setState({
        theme: JSON.parse(localStorage.getItem('theme'))
      })
    }
    
  }

  render() {
    return(
      (this.globalTheme)?(
        <MuiThemeProvider theme={this.globalTheme}>
          <CssBaseline />
          {
            (localStorage.getItem('uid')) ? <DashBoard changeTheme={this.changeTheme} /> : <SignIn />
          }
        </MuiThemeProvider>
      ):((localStorage.getItem('uid')) ? <DashBoard changeTheme={this.changeTheme} /> : <SignIn />)
    )
  }
}

export default App;
