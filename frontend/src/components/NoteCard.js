import React, { Component, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function NoteCard({ note, setPatientId })
{
    console.log(note)
    const { title, description, patient_id } = note

    let history = useHistory();
    function handleClick()
    {
        setPatientId(patient_id)
        history.push(`/patients/${patient_id}`);
        // console.log(id)
    }
    return (
        <div className='trialsCard'>
            Note Card
            <p>{title}</p>
            <p>{description}</p>
            <button onClick={handleClick}>View Patient</button>
        </div>
    )
}

export default NoteCard