import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab'
import Link from '@material-ui/core/Link';

import App from '../App'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(30)
  },
  alert: {
    marginTop: theme.spacing(2)
  },
  safeAlert: {
    display: "flex",
    justifyContent: "center"
  },
}));



export default function SignIn(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [invalid, setInvalid] = React.useState(null);
  const [conn, setConn] = React.useState(true);

  const classes = useStyles();

  function handleClick(event) {
    event.preventDefault();
    setLoading(true)
    const form = document.getElementById('signin-form');
    const uid = document.getElementById('uid').value
    const pass = document.getElementById('password').value

    try{
      fetch('/api', {
        method: 'POST',
        body: new URLSearchParams(new FormData(form))
      }).then(data => data.json()).then(data => {
        setLoading(false)
        if (!data.error) {
          localStorage.setItem('uid', uid)
          localStorage.setItem('password', pass)
          localStorage.setItem('attendance', JSON.stringify(data))
          localStorage.setItem('timestamp', Date.now())
          setLoggedIn(true);
        }
        else
          setInvalid(data.error)
      }).catch(err => {
        console.log(err)
        setLoading(false)
        setConn(false)
      })
    }
    catch(e){
      console.log(e)
    }
  }

  function Credits() {
    return (
      <Typography style={{marginTop: '20%', textAlign: 'right'}} variant="body2" color="textSecondary" align="center">
        {'Created with'} <FavoriteIcon fontSize={"inherit"} /> {'by '}<br />
        <strong>
        <Link color="inherit" href="https://github.com/xpt1x">
          Jatin Sarda
        </Link><br/>
        <Link color="inherit" href="https://github.com/SwarnimDoegar">
          Swarnim Doegar
        </Link><br/>
        </strong><br/>
        {'SnapAttendance is an '}
        <Link color="inherit" href="https://github.com/xpt1x/SnapAttendance/">
          OpenSource Project
        </Link><br/>
        {'Powered by '}
        <Link color="inherit" href="https://github.com/cu-unofficial/uims-api">
          uims-api
        </Link>
      </Typography>
    );
  }

  if(!loggedIn){
    return !loading ? (
      <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {invalid != null ? 
              <>
              <Alert severity="error"> {invalid} </Alert> </> : ''
          }
          {props.message ? <Alert className={classes.alert} severity="error">{props.message}</Alert>:""}
          {!conn ? <Alert className={classes.alert} severity="error">Network Error</Alert>:""}
          <form className={classes.form} noValidate id="signin-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="uid"
              label="UID"
              name="uid"
              autoComplete="uid"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
              startIcon={<LockOpenIcon />}
            >
              Sign In
          </Button>
          </form>
        </div>
        <Alert severity="success">
          <AlertTitle>Your data is safe!</AlertTitle>
          Your Credentials are Stored Locally
        </Alert>
        <Credits />
      </Container>
    </>) : (<div className={classes.spinner}> <CircularProgress /> </div>)
  }
  else{
    return (<App />)
  }

}