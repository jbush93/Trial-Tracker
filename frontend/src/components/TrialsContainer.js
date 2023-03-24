import React, { Component, useState } from 'react'
import TrialsCard from './TrialsCard'
import { useHistory } from 'react-router-dom';

function TrialsContainer({ trials, setTrialId })
{

    const [filter, setFilter] = useState('All')
    const [searchValue, setSearchValue] = useState("")

    let history = useHistory();

    function handleChange(e)
    {
        console.log(e.target.value)
        setSearchValue(e.target.value)
    }

    function handleClick(e)
    {
        // console.log(e.target.name)
        history.push(`/trials/create`);
    }

    function handleFilterChange(e)
    {
        setFilter(e.target.value)
    }

    const filteredTrials = trials.filter((trial) => (
        trial.brief_title.toLowerCase().includes(searchValue.toLowerCase()) && (filter === 'All') ? true : trial.phase === filter
    ));

    const mappedTrials = filteredTrials.map((trial) =>
    (
        <TrialsCard trial={trial} setTrialId={setTrialId} />
    ))

    const mappedOptions = trials
        ? [...new Set(trials.map((trial) => trial.phase))]
            .map((phase) => (
                <option>{phase}</option>
            ))
        : "";


    return (
        <div className='trialsContainer'>
            <div className="trials-container-header">
                <div>
                    <label>Phase: </label>
                    <select onChange={handleFilterChange}>
                        <option>All</option>
                        {mappedOptions}
                    </select>
                </div>
                <div>
                    <label>Search: </label>
                    <input onChange={handleChange} />
                </div>
                <button onClick={handleClick}>create new</button>
            </div>
            <div className='mapped-trials'>
                {mappedTrials}
            </div>
        </div>
    )
}

export default TrialsContainer