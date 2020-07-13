import React from 'react';

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
            if(data.error)
                console.log('Looks like your UIMS password is changed! Please up')
            localStorage.setItem('attendance', JSON.stringify(data))
            localStorage.setItem('timestamp', Date.now())
        })
    }
    return (
        <h1>DashBoard</h1>
    )
}