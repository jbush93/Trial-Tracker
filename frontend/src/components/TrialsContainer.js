import React, { Component } from 'react'
import TrialsCard from './TrialsCard'
import { useHistory } from 'react-router-dom';

function TrialsContainer({ trials, setTrialId })
{

    let history = useHistory();
    function handleClick(e)
    {
        // console.log(e.target.name)
        history.push(`/trials/create`);
    }
    const mappedTrials = trials.map(function (trial)
    {
        return <TrialsCard trial={trial} setTrialId={setTrialId} />
    })
    return (
        <div className='trialsContainer'>
            <div>
                <p>search / filter / <button onClick={handleClick}>create new</button></p>
            </div>
            <div>
                {mappedTrials}
            </div>
        </div>
    )
}

export default TrialsContainer