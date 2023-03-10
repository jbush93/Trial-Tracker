import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

function TrialPage({ trialId, setPatientId })
{
    useEffect(function ()
    {
        fetch(`http://localhost:3000/trials/${trialId}`)
            .then(function (resp)
            {
                return resp.json()
            })
            .then(function (data)
            {
                console.log(data)
                return setTrial(data)
            })
    }, [])

    let history = useHistory();
    function handlePatientClick(e)
    {
        setPatientId(e.target.value)
        history.push(`/patients/${e.target.value}`)
    }
    const [trial, setTrial] = useState([])

    const { NCTId, official_title, detailed_description, organization_name, lead_sponsor, patients, study_type, phase, start_date, overall_status, primary_completion_date, primary_completion_date_type, conditions, locations, arm_groups, outcomes, contact_name, contact_email, contact_phone } = trial

    const mappedConditions = conditions ? conditions.map(function (condition)
    {
        return <p>{condition.condition}</p>
    }) : "";
    const mappedPatients = patients ? patients.map(function (patient)
    {
        return <div className='box-patients-trial-info'>
            <p>{patient.first_name} {patient.last_name}</p>
            <p>{patient.gender} age: {patient.age}</p>
            <button onClick={handlePatientClick} value={patient.id}>View Patient</button>
        </div>
    }) : "";
    const mappedArmGroups = arm_groups ? arm_groups.map(function (arm_group)
    {
        return <div>
            <p>group type: {arm_group.group_type}</p>
            <p>intervention name: {arm_group.intervention_name} | label: {arm_group.label}</p>
        </div>
    }) : "";
    const mappedLocations = locations ? locations.map(function (location)
    {
        return <div>
            <p>Facility: {location.facility}</p>
            <p>City: {location.city} | State: {location.state} | Country: {location.country}.</p>
        </div>
    }) : "";

    return (
        <div className='trialPage'>
            <div className='component-header'>
                <div className='component-title'>
                    <h1>Trial Page</h1>
                </div>
                <div className='edit-button-div'>
                    <button>Edit Trial</button>
                </div>
            </div>
            <div className='main-trial-info'>
                <div className='trial-titles'>
                    <h3>Main Info</h3>
                </div>
                <p>NCTId: {NCTId}</p>
                <p>phase: {phase}</p>
                <p>title: {official_title}</p>
                <p>description: {detailed_description}</p>
                <p>organization: {organization_name}</p>
                <p>lead sponsor: {lead_sponsor}</p>
                {patients && <p>amount of patients: {patients.length}</p>}
                <p>study type: {study_type}</p>
                <p>status: {overall_status}</p>
                <p>start date: {start_date} | completion date: {primary_completion_date} {primary_completion_date_type}</p>
                <p>Contact name: {contact_name}</p>
                <p>contact email: {contact_email}</p>
                <p>contact phone: {contact_phone}</p>
            </div>
            <div className='conditions-trial-info'>
                <div className='trial-titles'>
                    <h3>Conditions</h3>
                </div>
                {mappedConditions}
            </div>
            <div className='patients-trial-info'>
                <div className='trial-titles'>
                    <h3>Patients</h3>
                </div>
                {mappedPatients}
            </div>
            <div className='arm-groups-trial-info'>
                <div className='trial-titles'>
                    <h3>Arm Groups</h3>
                </div>
                {mappedArmGroups}
            </div>
            <div className='locations-trial-info'>
                <div className='trial-titles'>
                    <h3>Locations</h3>
                </div>
                {mappedLocations}
            </div>
        </div>
    )
}

export default TrialPage