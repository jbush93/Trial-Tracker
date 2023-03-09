import React, { Component, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function TrialsCard({ trial, setTrialId })
{
    const { id } = trial


    let history = useHistory();
    function handleClick()
    {
        setTrialId(id)
        history.push(`/trials/${id}`);
    }
    return (
        <div className='trialsCard'>
            TrialsCard
            <button onClick={handleClick}>View Details</button>
        </div>
    )
}

export default TrialsCard