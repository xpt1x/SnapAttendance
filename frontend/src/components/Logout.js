import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Logout(props) {
    return (
        <IconButton onClick={props.onClick} style={{marginLeft: 'auto'}}>
            <ExitToAppIcon style={{color: '#fff'}}/>
        </IconButton>
    )
}

export default Logout
