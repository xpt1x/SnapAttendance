import React from 'react';
import Drawer from '@material-ui/core/Drawer';


export default function FullReport(props) {
  
  return (
    <div>
      <Drawer anchor='bottom' open={props.open} onClose={() => props.close(false)}>
      </Drawer>
    </div>
  );
}
