import React, { Component, useEffect, useState } from 'react'

function TrialPage({ trialId })
{
    useEffect(function ()
    {
        fetch(`http://localhost:3000/trials/${trialId}`)
            .then(function (resp)
            {
                return resp.json()
            })
            .then(function (data)
            {
                console.log(data)
                return setTrial(data)
            })
    }, [])

    const [trial, setTrial] = useState([])

    const { NCTId } = trial

    return (
        <div className='trialPage'>
            Trial Page
            <p>{NCTId}</p>
        </div>
    )
}

export default TrialPage