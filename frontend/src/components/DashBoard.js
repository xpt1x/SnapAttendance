import React from 'react';
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
    const cacheMinute = 1
    if(localStorage.getItem('attendance') != null && (Date.now() - parseInt(localStorage.getItem('timestamp')) <= 1000*60*cacheMinute))
    {
        console.log(`Cached attendance ${JSON.parse(localStorage.getItem('attendance'))}`)
    }
    else
    {
        const formdata = new FormData()
        formdata.append('uid', localStorage.getItem('uid'))
        formdata.append('password', localStorage.getItem('password'))

        fetch('/api', {
            method: 'POST',
            body: formdata
        }).then(data => data.json()).then(data => {
            console.log(data);
            //check error here also
            localStorage.setItem('attendance', JSON.stringify(data))
            localStorage.setItem('timestamp', Date.now())
        })
    }
    const classes = useStyles();
    return (
        <List component="ul">
            <ListItem>
                <Card className={classes.fullWidth}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Computer Networks Lab
                        </Typography>
                        <Typography variant="h6" color="textSecondary" className={classes.content}>
                            Total Attended: 12
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary" className={classes.content}>
                            Total Delivered: 14
                        </Typography>
                    </CardContent>
                </Card>
            </ListItem>
            <ListItem>
                <Card className={classes.fullWidth}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Computer Networks Lab
                        </Typography>
                        <Typography variant="h6" color="textSecondary" className={classes.content}>
                            Total Attended: 12
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary" className={classes.content}>
                            Total Delivered: 14
                        </Typography>
                    </CardContent>
                </Card>
            </ListItem>
        </List>
    )
}