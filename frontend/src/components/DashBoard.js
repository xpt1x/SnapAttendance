import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Logout from './Logout';
import SignIn from './SingIn';
import SubjectDetail from './SubjectDetail';

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 14
    },
    content: {
        fontSize: 12
    },
    fullWidth: {
        width: "100%"
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
        float: "right",
        marginRight: '1%'
    },
}))

function CircularProgressWithLabel(props) {
    const classes = useStyles();
    return (
      <Box className={classes.circular} position="relative" display="inline-flex">
        <CircularProgress size={60} variant="static"  {...props} />
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
              {props.value}
          </Typography>
        </Box>
      </Box>
    );
}
  
CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function DashBoard()
{
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [subject, setSubject] = useStyles({})
    const cacheMinute = 5;
    
    function logout() {
        localStorage.clear();
        setLoggedIn(false);
    }

    function showSubject(subject){
        setSubject(subject);
    }
    useEffect(() => {
        if(loggedIn){
            if (localStorage.getItem('attendance') && (Date.now() - parseInt(localStorage.getItem('timestamp')) <= 1000 * 60 * cacheMinute)) {
                setAttendance(JSON.parse(localStorage.getItem('attendance')))
            }

            else {
                const formdata = new FormData()
                formdata.append('uid', localStorage.getItem('uid'))
                formdata.append('password', localStorage.getItem('password'))
                setLoading(true)
                fetch('http://localhost:5000/api', {
                    method: 'POST',
                    body: formdata
                }).then(data => data.json()).then(data => {

                    if (data.error){
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
                })
            }
        }
    }, [loggedIn])  

    const classes = useStyles();


    if(loggedIn){
        return !loading ? (
            !subject ? (
                <>
                    <Logout onClick={logout} />
                    <List component="ul">
                        {attendance.map(subject => (
                            <ListItem key={subject.Code}>
                                <CardActionArea>
                                    <Card className={classes.fullWidth} button onClick={() => showSubject(subject)}>
                                        <Box className={subject.colorcode === 'Green' ? classes.boxGreen : classes.boxRed} borderLeft={7}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {subject.Title}
                                                </Typography>
                                                <CircularProgressWithLabel value={parseInt(subject.TotalPercentage)} />
                                                <Typography variant="h6" color="textSecondary" className={classes.content}>
                                                    Total Percentage: {subject.TotalPercentage}
                                                </Typography>
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
            ):<SubjectDetail subject={subject} close={setSubject}/>
        ) : (<div className={classes.spinner}> <CircularProgress /> </div>)
    }
    else
        return invalid ? <SignIn message="Your UIMS Password Expired" /> : <SignIn/>
}
  