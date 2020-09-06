import React from 'react';
import Drawer from '@material-ui/core/Drawer';


export default function FullReport(props) {
  function handleClose(){
    window.history.back()
    props.close(false)
  }
  
  return (
    <div>
      <Drawer anchor='bottom' open={props.open} onClose={handleClose}>
      </Drawer>
    </div>
  );
}
