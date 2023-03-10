import React, { Component, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function PatientsCard({ patient, setPatientId })
{
    const { id, first_name, last_name, address, gender, height, age, weight, trial, trial_id, notes, conditions, measurements } = patient



    let history = useHistory();
    function handleClick()
    {
        setPatientId(id)
        history.push(`/patients/${id}`);
    }
    return (
        <div className='patientsCard'>
            <p>{first_name} {last_name} </p>
            <p>Gender: {gender}</p>
            <p>Age: {age}</p>
            <p>Trial: {trial.brief_title}</p>
            <button onClick={handleClick}>View Details</button>
        </div>
    )
}

export default PatientsCard