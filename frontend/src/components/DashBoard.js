import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    title: {
        fontSize: 14
    },
    content: {
        fontSize: 12
    },
    fullWidth: {
        width: "100%"
    }
})


export default function DashBoard()
{
    const [attendance, setAttendance] = useState([])
    const cacheMinute = 1
    useEffect(() => {
        const formdata = new FormData()
        formdata.append('uid', localStorage.getItem('uid'))
        formdata.append('password', localStorage.getItem('password'))

        fetch('/api', {
            method: 'POST',
            body: formdata
        }).then(data => data.json()).then(data => {
            console.log(data);
            setAttendance(data)
            //check error here also
            if(data.error)
                console.log('Looks like your UIMS password is changed!')

            localStorage.setItem('attendance', JSON.stringify(data))
            localStorage.setItem('timestamp', Date.now())
        })
    }, [])

    if(localStorage.getItem('attendance') != null && (Date.now() - parseInt(localStorage.getItem('timestamp')) <= 1000*60*cacheMinute))
    {
        setAttendance(JSON.parse(localStorage.getItem('attendance')))
        console.log(`This is cached attendance ${attendance}`)
    }

    const classes = useStyles();
    return (
        <List component="ul">
            {attendance.map(subject => ( 
            <ListItem>
                <Card className={classes.fullWidth}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {subject.Title} [{subject.Code}]
                        </Typography>
                        <Typography variant="h6" color="textSecondary" className={classes.content}>
                            Total Percentage: {subject.TotalPercentage}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" className={classes.content}>
                            Total Attended: {subject.Total_Att}
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary" className={classes.content}>
                            Total Delivered: {subject.Total_Delv}
                        </Typography>
                    </CardContent>
                </Card>
            </ListItem>
            ))}
        </List>
    )
}