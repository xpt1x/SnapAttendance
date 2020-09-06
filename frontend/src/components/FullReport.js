import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
  limitHeight:{
      maxHeight: '75%',
  },
}));

export default function FullReport(props) {

  function handleClose(){
    window.history.back()
    props.close(false)
  }

  const classes = useStyles();
  const object = props.data.find(element => element.Code === props.code)
  return object !== undefined ? (
    <div>
      <Drawer anchor='bottom' classes={{paperAnchorBottom: classes.limitHeight}} open={props.data ? true : false} onClose={() => handleClose}>
        <List component="ul">
          {object.FullAttendanceReport.map(day => (
            <ListItem>
              <ListItemText>{day.AttDate}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  ) : false
}
