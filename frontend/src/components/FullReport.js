import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  limitHeight:{
      maxHeight: '80%',
  },
}));

const RedTypography = withStyles({
  root: {
    color: red[400]
  }
})(Typography);
const GreenTypography = withStyles({
  root: {
    color: green[400]
  }
})(Typography);

export default function FullReport(props) {

  function handleClose(){
    window.history.back()
    props.close(false)
  }
  const classes = useStyles();
  const object = props.data.find(element => element.Code === props.code)
  if(object !== undefined){
      return (<Drawer anchor='bottom' classes={{paperAnchorBottom: classes.limitHeight}} open={props.data ? true : false} onClose={handleClose}>
        <List>
          {object.FullAttendanceReport.map((entry, i) => (
            <div key={i}>
              <ListItem alignItems="flex-start">
                <ListItemText
                primary={entry.AttendanceCode === "P"? 
                <GreenTypography>Present</GreenTypography>:
                <RedTypography>Absent</RedTypography>
                }
                secondary={
                  <>
                   <Typography
                      component="span"
                      variant="subtitle2"
                      color="textSecondary">
                     {entry.AttDate}
                   </Typography>
                   <br/>
                   <Typography
                      component="span"
                      variant="subtitle2"
                      color="textSecondary"
                      >
                      {entry.Timing}
                   </Typography>
                  </>
                }
                />
              </ListItem>
              <Divider component="li" />
            </div>
          ))}
        </List>
      </Drawer>)
}
else{
  return null
}
}
