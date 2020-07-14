import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DashBoard from '../components/DashBoard'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
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
  }
}));


export default function SignIn() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);

  const classes = useStyles();

  function handleClick(event) {
    event.preventDefault();
    setLoading(true)
    const form = document.getElementById('signin-form');
    const uid = document.getElementById('uid').value
    const pass = document.getElementById('password').value

    fetch('http://localhost:5000/api', {
      method: 'POST',
      body: new URLSearchParams(new FormData(form))
    }).then(data => data.json()).then(data => {
      console.log(data);
      setLoading(false)
      if (!data.error) {
        localStorage.setItem('uid', uid)
        localStorage.setItem('password', pass)
        localStorage.setItem('attendance', JSON.stringify(data))
        localStorage.setItem('timestamp', Date.now())
        setLoggedIn(true);
      }
      else
        setInvalid(true)
    })
  }

  if(!loggedIn){
    return !loading ? (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {invalid ? <Alert className={classes.alert} severity="error">Invalid credentials!</Alert> : ''}
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
            >
              Sign In
          </Button>
          </form>
        </div>
      </Container>
    ) : (<div className={classes.spinner}>
        <CircularProgress />
        </div>
        )
  }
  else{
    return (<DashBoard />)
  }

}