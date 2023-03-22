import React, { Component, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function NoteCard({ note, setPatientId })
{
    console.log(note)
    const { title, description, patient_id, patient } = note

    let history = useHistory();
    function handleClick()
    {
        setPatientId(patient_id)
        history.push(`/patients/${patient_id}`);
        // console.log(id)
    }
    return (
        <div className='trialsCard'>
            <p><b>{title}</b></p>
            <p>Patient: {patient.first_name} {patient.last_name}</p>
            <p>Description: {description}</p>
            <button onClick={handleClick}>View Patient</button>
        </div>
    )
}

export default NoteCard