import React, { Component, useEffect, useState } from 'react'

function PatientPage({ patientId })
{
    const [patient, setPatient] = useState([])
    useEffect(function ()
    {
        fetch(`http://localhost:3000/patients/${patientId}`)
            .then(function (resp)
            {
                return resp.json()
            })
            .then(function (data)
            {
                // console.log(data)
                return setPatient(data)
            })
    }, [])

    const { id } = patient
    return (
        <div className='patientPage'>
            PatientsPage
            <p>Patient ID: {id}</p>
        </div>
    )
}

export default PatientPage