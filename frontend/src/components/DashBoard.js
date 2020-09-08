import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Logout from './Logout';
import SignIn from './SignIn';
import SubjectDetail from './SubjectDetail';

const circularProgressTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#34bf58'
        },
        secondary: {
            main: '#e05151'
        }
    }
})

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 14
    },
    content: {
        fontSize: 12
    },
    fullWidth: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(30)
    },
    boxGreen: {
        borderColor: '#34bf58'
    },
    boxRed: {
        borderColor: '#e05151'
    },
    circular: {
        position: 'absolute',
        top: '50%',
        right: '3%',
        transform: 'translateY(-50%)'
    },
    colorGreen: {
        color: '#34bf58'
    },
    colorRed: {
        color: '#e05151'
    },
}))

function CircularProgressWithLabel(props) {
    const classes = useStyles();
    return (
        <Box className={classes.circular} position="relative" display="inline-flex">
            <ThemeProvider theme={circularProgressTheme} >
                <CircularProgress size={80} variant="static"  {...props} />
            </ThemeProvider>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h6" component="div" color="textPrimary">
                    {props.lectures !== '0' ? props.value : <Typography color='textSecondary'> NApp </Typography>}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function DashBoard(props) {
    const [attendance, setAttendance] = useState([])
    const [fullAttendance, setFullAttendance] = useState([])
    const [loading, setLoading] = useState(false)
    const [fullloading, setFullloading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [subject, setSubject] = useState({});
    const [fullOpen, setFullOpen] = React.useState(false)
    const cacheMinute = 5;

    var route = '/api/attendance'
    var fullroute = '/api/fullattendance'
    var prod = 'https://snap-attendance-0.appspot.com'
    var local = 'http://127.0.0.1:5000'

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        route = `${local}${route}`
        fullroute = `${local}${fullroute}`
    }
    else {
        route = `${prod}${route}`
        fullroute = `${prod}${fullroute}`
    }

    function logout() {
        localStorage.removeItem('uid')
        localStorage.removeItem('password')
        setLoggedIn(false);
    }

    function showSubject(subject) {
        setSubject(subject);
    }

    function compareTitles(a, b) {
        if (a.Title < b.Title)
            return -1
        else if (a.Title > b.Title)
            return 1
        else
            return 0
    }
    const cardClickHandler = (subject) => {
        
        if(parseInt(subject.Total_Delv) !== 0) {
            window.location.hash = `#subject`
            return showSubject(subject)
        }
        return false
    }

    useEffect(() => {
        if (loggedIn) 
        {
            if (localStorage.getItem('attendance') && (Date.now() - parseInt(localStorage.getItem('timestamp')) <= 1000 * 60 * cacheMinute)) {
                setAttendance(JSON.parse(localStorage.getItem('attendance')))
            }

            else {
                const formdata = new FormData()
                formdata.append('uid', localStorage.getItem('uid'))
                formdata.append('password', localStorage.getItem('password'))
                setLoading(true)
                try {
                    fetch(route, {
                        method: 'POST',
                        body: formdata
                    }).then(data => data.json()).then(data => {

                        if (data.error) {
                            console.log('Looks like your UIMS password is changed!')
                            setInvalid(true);
                            logout();
                        }

                        else {
                            setLoading(false)
                            setAttendance(data)

                            localStorage.setItem('attendance', JSON.stringify(data))
                            localStorage.setItem('timestamp', Date.now())
                        }
                    }).catch(err => {
                        console.log(err)
                        setLoading(false);
                        if (localStorage.getItem('attendance')) {
                            setAttendance(JSON.parse(localStorage.getItem('attendance')))
                        }
                        else {
                            logout()
                        }
                    })
                }
                catch (e) {
                    console.log(e)
                    setLoading(false);
                    if (localStorage.getItem('attendance')) {
                        setAttendance(JSON.parse(localStorage.getItem('attendance')))
                    }
                    else {
                        logout()
                    }
                }
            }

            if (localStorage.getItem('fullattendance') && (Date.now() - parseInt(localStorage.getItem('timestamp')) <= 1000 * 60 * cacheMinute)) {
                setFullAttendance(JSON.parse(localStorage.getItem('fullattendance')))
            }

            else {
                const formdata = new FormData()
                formdata.append('uid', localStorage.getItem('uid'))
                formdata.append('password', localStorage.getItem('password'))
                setFullloading(true)
                try {
                    fetch(fullroute, {
                        method: 'POST',
                        body: formdata
                    }).then(data => data.json()).then(data => {

                        if (data.error) {
                            console.log('Looks like your UIMS password is changed!')
                            setInvalid(true);
                            logout();
                        }

                        else {
                            setFullloading(false)
                            setFullAttendance(data)

                            localStorage.setItem('fullattendance', JSON.stringify(data))
                        }
                    }).catch(err => {
                        console.log(err)
                        setFullloading(false);
                        if (localStorage.getItem('fullattendance')) {
                            setFullAttendance(JSON.parse(localStorage.getItem('fullattendance')))
                        }
                        else 
                            logout()
                    })
                }
                catch (e) {
                    console.log(e)
                    setFullloading(false);
                    if (localStorage.getItem('fullattendance')) {
                        setFullAttendance(JSON.parse(localStorage.getItem('fullattendance')))
                    }
                    else 
                        logout()
                }
            }
        }
        window.addEventListener('popstate', function (event) {
            const currentHash = event.path[0].location.hash;
            if (currentHash === ""){
                setSubject({})
            }
            else if(currentHash === "#subject"){
                setFullOpen(false);
            }
            else if (currentHash === "#subject#expand"){
                setFullOpen(true)
            }
        })
    }, [route, fullroute, loggedIn])

    const classes = useStyles();


    if (loggedIn) {
        return (

            !loading ? (
                (!Object.keys(subject).length) ? (
                    <>
                        <AppBar position="fixed">
                            <Toolbar>
                                <Grid justify="space-between" container>
                                    <Grid item>
                                        <Typography type='title' style={{ marginTop: '5%' }}><strong>{Object(attendance[0])['name']}</strong> ({Object(attendance[0])['UId']})</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={props.changeTheme}>
                                            <Brightness4Icon style={{ color: '#fff' }} />
                                        </IconButton>
                                        <Logout onClick={logout} />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        <List component="ul" style={{ top: '60px' }}>
                            {attendance.sort(compareTitles).map(subject => (
                                <ListItem key={subject.Code}>
                                    <CardActionArea>
                                        <Card className={classes.fullWidth} onClick={() => { cardClickHandler(subject) }} elevation={10}>
                                            <Box className={parseFloat(subject.EligibilityPercentage) >= 75.0 ? classes.boxGreen : classes.boxRed} borderLeft={7}>
                                                <CardContent>
                                                    <Typography variant="h6" gutterBottom>
                                                        {subject.Title.toUpperCase()}
                                                    </Typography>
                                                    <CircularProgressWithLabel lectures={parseInt(subject.Total_Delv) !== 0 ? '1' : '0'} value={parseFloat(subject.EligibilityPercentage)} color={parseFloat(subject.EligibilityPercentage) >= 75.0 ? 'primary' : 'secondary'} />
                                                    <Typography variant="h6" color="textSecondary" className={classes.content}>
                                                        Total Attended: {subject.Total_Attd}
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom color="textSecondary" className={classes.content}>
                                                        Total Delivered: {subject.Total_Delv}
                                                    </Typography>
                                                    <Typography variant="overline" gutterBottom color="textPrimary" className={classes.content}>
                                                        [{subject.Code}]
                                                </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </CardActionArea>
                                </ListItem>
                            ))}
                        </List>
                    </>
                ) : <SubjectDetail fullLoading={fullloading} fullAttendance={fullAttendance} subject={subject} close={setSubject} drawerHandler={setFullOpen} drawerState={fullOpen}/>
            ) : (<div className={classes.spinner}> <CircularProgress /> </div>)

        )
    }
    else
        return invalid ? <SignIn message="Your UIMS Password Expired" /> : <SignIn />
}
