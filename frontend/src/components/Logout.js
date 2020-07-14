import React from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Logout(props) {
    return (
        <Button onClick={props.onClick}>
            <ExitToAppIcon/>
        </Button>
    )
}

export default Logout
