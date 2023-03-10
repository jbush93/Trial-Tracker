import React, { Component, useState } from 'react'
import TrialsCard from './TrialsCard'
import { useHistory } from 'react-router-dom';

function TrialsContainer({ trials, setTrialId })
{

    const [filter, setFilter] = useState('All')
    let history = useHistory();

    function handleClick(e)
    {
        // console.log(e.target.name)
        history.push(`/trials/create`);
    }

    function handleFilterChange(e)
    {
        setFilter(e.target.value)
    }

    const filteredTrials = trials.filter(trial => (
        (filter === 'All') ? true : trial.phase === filter
    ));

    const mappedTrials = filteredTrials.map(function (trial)
    {
        return <TrialsCard trial={trial} setTrialId={setTrialId} />
    })

    const mappedOptions = trials
        ? [...new Set(trials.map((trial) => trial.phase))]
            .map((phase) => (
                <option>{phase}</option>
            ))
        : "";



    return (
        <div className='trialsContainer'>
            <div>
                <select onChange={handleFilterChange}>
                    <option>All</option>
                    {mappedOptions}
                </select>
                <p>search / filter / <button onClick={handleClick}>create new</button></p>
            </div>
            <div>
                {mappedTrials}
            </div>
        </div>
    )
}

export default TrialsContainer