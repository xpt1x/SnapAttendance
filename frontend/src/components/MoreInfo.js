import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function MoreInfo(props) {

  return (
    <div>
      <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
          Reasons behind INVALID Credentials
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You may have entered wrong UID or password
          </Typography>
          <Typography gutterBottom>
            Sometimes invalid creds also depicts that there exists a barrier 
            in fetching your attendance from UIMS, please visit UIMS to resolve it first.
          </Typography>
          <Divider style={{marginTop: '2%', marginBottom: '2%'}} />
          <Typography gutterBottom>
            This application is completely dependent on UIMS, during events they block attendance
            module, at that time you can face INVALID CREDS error too.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}