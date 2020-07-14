import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Logout(props) {
    return (
        <IconButton onClick={props.onClick}>
            <ExitToAppIcon/>
        </IconButton>
    )
}

export default Logout
