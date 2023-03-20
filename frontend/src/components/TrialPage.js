import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import GenderChart from './GenderChart';

function TrialPage({ trialId, setPatientId })
{
    const [newCondition, setNewCondition] = useState([])
    const [newGroup, setNewGroup] = useState([])

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
    }, [newCondition, newGroup])

    let history = useHistory();
    function handlePatientClick(e)
    {
        setPatientId(e.target.value)
        history.push(`/patients/${e.target.value}`)
    }

    function handleAddPatient()
    {
        history.push(`/patients/create`)
    }

    const [addCondition, setAddCondition] = useState(false)
    function handleAddCondition()
    {
        setAddCondition(true)
    }

    const [conditionState, setConditionState] = useState({
        trial_id: trialId,
        condition: ""
    })

    function handleConditionChange(e)
    {
        setConditionState(conditionState => ({ ...conditionState, [e.target.name]: e.target.value }))
    }
    function handleConditionSubmit(e)
    {
        e.preventDefault()
        fetch(`http://localhost:3000/conditions`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(conditionState)
        })
            .then(res => res.json())
            .then(data => setNewCondition(data))
            .then(setAddCondition(false))
    }

    const [addGroup, setAddGroup] = useState(false)
    function handleAddGroup()
    {
        setAddGroup(true)
    }

    const [groupState, setGroupState] = useState({
        trial_id: trialId,
        label: "",
        group_type: "",
        description: "",
        intervention_name: "",
    })

    function handleConditionChange(e)
    {
        setGroupState(groupState => ({ ...groupState, [e.target.name]: e.target.value }))
    }
    function handleGroupSubmit(e)
    {
        e.preventDefault()
        fetch(`http://localhost:3000/arm_groups`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(groupState)
        })
            .then(res => res.json())
            .then(data => setNewGroup(data))
            .then(setAddGroup(false))
    }

    const [trial, setTrial] = useState([])
    const { NCTId, official_title, detailed_description, organization_name, lead_sponsor, patients, study_type, phase, start_date, overall_status, primary_completion_date, primary_completion_date_type, conditions, locations, arm_groups, outcomes, contact_name, contact_email, contact_phone, id, brief_title } = trial

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
            <p><b>Group Type:</b> {arm_group.group_type}</p>
            <p><b>Intervention Name:</b> {arm_group.intervention_name} | label: {arm_group.label}</p>
        </div>
    }) : "";

    const mappedLocations = locations ? locations.map(function (location)
    {
        return <div>
            <p>Facility: {location.facility}</p>
            <p>City: {location.city} | State: {location.state} | Country: {location.country}.</p>
        </div>
    }) : "";

    const mappedOutcomes = outcomes ? outcomes.map(function (outcome)
    {
        return <div>
            <p>Description: {outcome.outcome_description}</p>
            <p>Measure: {outcome.outcome_measure} | Timeframe: {outcome.outcome_timeframe} | Type: {outcome.outcome_type}</p>
        </div>
    }) : "";

    return (
        <div className='trialsContainer'>
            <Card style={{ minHeight: '50vh', width: '85vw' }}>
                <Card.Header
                    className="d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: '#e46872', color: 'black' }}
                >
                    <h3>Trial {id} - {brief_title} </h3>
                    <Button variant="primary" name="trials">Edit Trial</Button>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '10vh' }}>
                    <div className='main-trial-info'>
                        <div className='main-trial-left'>
                            <p><b>NCTId:</b> {NCTId}</p>
                            <p><b>Phase:</b> {phase}</p>
                            <p><b>Official Title:</b> {official_title}</p>
                            <p><b>Description:</b> {detailed_description}</p>
                        </div>
                        <div className='main-trial-right'>
                            <p><b>Organization:</b> {organization_name}</p>
                            <p><b>Lead Sponsor:</b> {lead_sponsor}</p>
                            {patients && <p><b>Amount of Patients:</b> {patients.length}</p>}
                            <p><b>Study Type:</b> {study_type}</p>
                            <p><b>Status:</b> {overall_status}</p>
                            <p><b>Start Date:</b> {start_date} | completion date: {primary_completion_date} {primary_completion_date_type}</p>
                            <p><b>Contact Name:</b> {contact_name}</p>
                            <p><b>Contact Email:</b> {contact_email}</p>
                            <p><b>Contact Phone:</b> {contact_phone}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ height: '100vh', width: '85vw' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h6>Patients </h6>
                    <Button variant="primary" name="trials" onClick={handleAddPatient}>Add Patient</Button>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', height: '10vh' }}>
                    <div className='patients-trial-info'>
                        {mappedPatients}
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ minHeight: '30vh', width: '85vw' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h6>Conditions </h6>
                    <Button variant="primary" name="trials" onClick={handleAddCondition}>Add Condition</Button>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '20vh' }}>
                    <div className='conditions-trial-info'>
                        {addCondition ? <form onSubmit={handleConditionSubmit}>
                            <input type="text" name="condition" onChange={handleConditionChange} />
                            <button type='submit'>Add</button>
                        </form> : ""}
                        {mappedConditions}
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ minHeight: '30vh', width: '85vw' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h6>Arm Groups </h6>
                    <Button variant="primary" name="trials" onClick={handleAddGroup}>Add Arm Group</Button>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '20vh' }}>
                    <div className='arm-groups-trial-info'>
                        {addGroup ? <form onSubmit={handleGroupSubmit}>
                            <label>Label</label>
                            <input type="text" name="label" onChange={handleConditionChange} />
                            <label>group type</label>
                            <input type="text" name="group_type" onChange={handleConditionChange} />
                            <label>description</label>
                            <input type="text" name="description" onChange={handleConditionChange} />
                            <label>intervention name</label>
                            <input type="text" name="intervention_name" onChange={handleConditionChange} />
                            <button type='submit'>Add</button>
                        </form> : ""}
                        {mappedArmGroups}
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ minHeight: '30vh', width: '85vw' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h6>Locations</h6>
                    <Button variant="primary" name="trials">Add Location</Button>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '20vh' }}>
                    <div className='locations-trial-info'>
                        {mappedLocations}
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ minHeight: '30vh', width: '85vw' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h6>Outcomes</h6>
                    <Button variant="primary" name="trials">Add Outcome</Button>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '20vh' }}>
                    <div className='outcomes-trial-info'>
                        {mappedOutcomes}
                    </div>
                </Card.Body>
            </Card>
            <GenderChart trial={trial} />
        </div >
    )
}

export default TrialPage