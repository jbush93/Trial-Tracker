import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import PatientsChart from './PatientsChart';


function Dashboard()
{
    let history = useHistory();
    function handleClick(e)
    {
        // console.log(e.target.name)
        history.push(`/${e.target.name}`);
    }
    return (
        <div className='dashboard'>
            <div className='dashboard-item'>Trials
                <button onClick={handleClick} name="trials">View Trials</button>
            </div>
            <div className='dashboard-item'>Patients
                <button onClick={handleClick} name="patients">View Patients</button>
                <div className='chart-div'>
                    <PatientsChart />
                </div>
            </div>
            <div className='dashboard-item'>Notes
                <button onClick={handleClick} name="notes">View Notes</button>
            </div>
            <div className='dashboard-item'>Create New Trial
                <button onClick={handleClick}>View Details</button>
            </div>
        </div>
    )
}

export default Dashboard