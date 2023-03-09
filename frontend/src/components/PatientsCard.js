import React, { Component, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function PatientsCard({ patient, setPatientId })
{
    const { id } = patient



    let history = useHistory();
    function handleClick()
    {
        setPatientId(id)
        history.push(`/patients/${id}`);
    }
    return (
        <div className='patientsCard'>
            Patients Card
            <p>Patient ID: {id} </p>
            <button onClick={handleClick}>View Details</button>
        </div>
    )
}

export default PatientsCard