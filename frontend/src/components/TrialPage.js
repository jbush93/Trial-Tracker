import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import GenderChart from './GenderChart';
import ChartTwo from './ChartTwo';

function TrialPage({ trialId, setPatientId, setDeletedTrial, deletedPatient })
{
  const [newCondition, setNewCondition] = useState([])
  const [newGroup, setNewGroup] = useState([])
  const [newLocation, setNewLocation] = useState([])
  const [newOutcome, setNewOutcome] = useState([])
  const [editTrial, setEditTrial] = useState(false)
  const [trial, setTrial] = useState([])
  const [trialState, setTrialState] = useState({
    NCTId: "",
    phase: "",
    official_title: "",
    detailed_description: "",
    organization_name: "",
    lead_sponsor: "",
    study_type: "",
    overall_status: "",
    start_date: "",
    primary_completion_date: "",
    primary_completion_date_type: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
  })

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
        setTrial(data)
        return setTrialState({
          NCTId: data.NCTId,
          phase: data.phase,
          official_title: data.official_title,
          detailed_description: data.detailed_description,
          organization_name: data.organization_name,
          lead_sponsor: data.lead_sponsor,
          study_type: data.study_type,
          overall_status: data.overall_status,
          start_date: data.start_date,
          primary_completion_date: data.primary_completion_date,
          primary_completion_date_type: data.primary_completion_date_type,
          contact_name: data.contact_name,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone,
        })
      })
  }, [newCondition, newGroup, editTrial, newLocation, deletedPatient, newOutcome])

  console.log(trial.patients)

  const { NCTId, official_title, detailed_description, organization_name, lead_sponsor, patients, study_type, phase, start_date, overall_status, primary_completion_date, primary_completion_date_type, conditions, locations, arm_groups, outcomes, contact_name, contact_email, contact_phone, id, brief_title, patient_measurements, measurements } = trial

  console.log(patient_measurements)

  let history = useHistory();
  function handlePatientClick(e)
  {
    setPatientId(e.target.value)
    history.push(`/patients/${e.target.value}`)
  }

  function handleEditClick()
  {
    setEditTrial(!editTrial)
  }

  function handleAddPatient()
  {
    history.push(`/patients/create`)
  }

  const [addCondition, setAddCondition] = useState(false)
  function handleAddCondition()
  {
    setAddCondition(!addCondition)
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
    setAddGroup(!addGroup)
  }

  const [groupState, setGroupState] = useState({
    trial_id: trialId,
    label: "",
    group_type: "",
    description: "",
    intervention_name: "",
  })
  const [addLocation, setAddLocation] = useState(false)
  function handleAddLocation()
  {
    setAddLocation(!addLocation)
  }

  const [locationState, setLocationState] = useState({
    facility: "",
    city: "",
    state: "",
    country: "",
    trial_id: trialId,
  })

  function handleLocationChange(e)
  {
    setLocationState(locationState => ({ ...locationState, [e.target.name]: e.target.value }))
  }
  function handleGroupChange(e)
  {
    setGroupState(groupState => ({ ...groupState, [e.target.name]: e.target.value }))
  }

  function handleTrialChange(e)
  {
    setTrialState(trialState => ({ ...trialState, [e.target.name]: e.target.value }))
  }
  console.log(trialState)
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
  function handleLocationSubmit(e)
  {
    e.preventDefault()
    fetch(`http://localhost:3000/locations`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(locationState)
    })
      .then(res => res.json())
      .then(data => setNewLocation(data))
      .then(setAddLocation(false))
  }

  function handleEditTrialSubmit(e)
  {
    e.preventDefault()
    fetch(`http://localhost:3000/trials/${trialId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(trialState)
    })
      .then(res => res.json())
      .then(data => setTrial(data))
      .then(setEditTrial(false))
  }
  const [addOutcome, setAddOutcome] = useState(false)
  function handleAddOutcome()
  {
    setAddOutcome(!addOutcome)
  }

  const [outcomeState, setOutcomeState] = useState({
    outcome_type: "",
    outcome_measure: "",
    outcome_description: "",
    outcome_timeframe: "",
    trial_id: trialId,
  })

  function handleOutcomeChange(e)
  {
    setOutcomeState(outcomeState => ({ ...outcomeState, [e.target.name]: e.target.value }))
  }

  function handleOutcomeSubmit(e)
  {
    e.preventDefault()
    fetch(`http://localhost:3000/outcomes`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(outcomeState)
    })
      .then(res => res.json())
      .then(data => setNewOutcome(data))
      .then(setAddOutcome(false))
  }

  const mappedConditions = conditions ? conditions.map(function (condition)
  {
    return <p>{condition.condition}</p>
  }) : "";

  const mappedPatients = patients ? patients.map(function (patient)
  {
    return <div className='box-patients-trial-info'>
      <p>{patient.first_name} {patient.last_name}</p>
      <p>{patient.gender} age: {patient.age}</p>
      <p>Placebo: {patient.placebo ? "True" : "False"}</p>
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
    return <tr>
      <td>{location.facility}</td>
      <td>{location.city}</td>
      <td>{location.state}</td>
      <td>{location.country}</td>
    </tr>
  }) : "";

  const mappedOutcomes = outcomes ? outcomes.map(function (outcome)
  {
    return <tr>
      <td>{outcome.outcome_description}</td>
      <td>{outcome.outcome_measure}</td>
      <td>{outcome.outcome_timeframe}</td>
      <td>{outcome.outcome_type}</td>
    </tr>
  }) : "";


  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () =>
  {
    setShowModal(true);
  }

  const handleConfirmDelete = () =>
  {
    fetch(`http://localhost:3000/trials/${trialId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
      },
    })
      .then(res => res.text())
      .then(data => setDeletedTrial(data))
      .then(setDeletedTrial([]))
      .then(setShowModal(false))
      .then(history.push('/trials'))
  }

  const handleCancelDelete = () =>
  {
    setShowModal(false);
  }

  const sortedMeasurements = patient_measurements ? patient_measurements.sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  const mappedMeasurements = sortedMeasurements.map(function (measurement)
  {
    return <tr>
      <td>{measurement.date}</td>
      <td>{measurement.first_name} {measurement.last_name}</td>
      <td>{measurement.measurement}</td>
      <td>{measurement.measurement_label}</td>
    </tr>
  });

  return (
    <div className='trialsContainer'>
      <Card style={{ minHeight: '50vh', width: '85vw' }}>
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{ color: 'black' }}
        >
          <h3>Trial - {brief_title} </h3>
          <Button variant="primary" name="trials" onClick={handleEditClick}>Edit Trial</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '10vh' }}>
          {editTrial ?
            <div className='main-trial-info'>
              <div className='form-container'>
                <form onSubmit={handleEditTrialSubmit}>
                  <label>NTCId:</label>
                  <input type="text" name="NCTId" className="form-control" defaultValue={NCTId} onChange={handleTrialChange} />
                  <label>Phase:</label>
                  <input type="text" name="phase" className="form-control" defaultValue={phase} onChange={handleTrialChange} />
                  <label>Offical Title:</label>
                  <input type="text" name="official_title" className="form-control" defaultValue={official_title} onChange={handleTrialChange} />
                  <label>Description:</label>
                  <textarea type="text" name="detailed_description" className="form-control" defaultValue={detailed_description} wrap="soft" onChange={handleTrialChange} />
                  <label>Organization:</label>
                  <input type="text" name="organization_name" className="form-control" defaultValue={organization_name} onChange={handleTrialChange} />
                  <label>Lead Sponsor:</label>
                  <input type="text" name="lead_sponsor" className="form-control" defaultValue={lead_sponsor} onChange={handleTrialChange} />
                  <label>Study Type:</label>
                  <input type="text" name="study_type" className="form-control" defaultValue={study_type} onChange={handleTrialChange} />
                  <label>Status:</label>
                  <input type="text" name="overall_status" className="form-control" defaultValue={overall_status} onChange={handleTrialChange} />
                  <label>Start Date:</label>
                  <input type="text" name="start_date" className="form-control" defaultValue={start_date} onChange={handleTrialChange} />
                  <label>Completion date:</label>
                  <input type="text" name="primary_completion_date" className="form-control" defaultValue={primary_completion_date} onChange={handleTrialChange} />
                  <label>Completion date type:</label>
                  <input type="text" name="primary_completion_date_type" className="form-control" defaultValue={primary_completion_date_type} onChange={handleTrialChange} />
                  <label>contact name:</label>
                  <input type="text" name="contact_name" className="form-control" defaultValue={contact_name} onChange={handleTrialChange} />
                  <label>contact email:</label>
                  <input type="text" name="contact_email" className="form-control" defaultValue={contact_email} onChange={handleTrialChange} />
                  <label>contact phone:</label>
                  <input type="text" name="contact_phone" className="form-control" defaultValue={contact_phone} onChange={handleTrialChange} />
                  <button type="submit" className="btn btn-primary">Submit Edits</button>
                </form>
              </div>
            </div>
            :
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
          }
        </Card.Body>
      </Card>
      <Card style={{ minHeight: '30vh', width: '85vw' }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6>Aggregate Patient Measurements </h6>
        </Card.Header>
        <Card.Body>
          <ChartTwo patient_measurements={patient_measurements} />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Patient</th>
                <th scope="col">Measurement</th>
                <th scope="col">Label</th>
              </tr>
            </thead>
            <tbody>
              {mappedMeasurements}
            </tbody>
          </table>
        </Card.Body>
      </Card>
      <Card style={{ minHeight: '25vh', width: '85vw' }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6>Patients </h6>
          <Button variant="primary" name="trials" onClick={handleAddPatient}>Add Patient</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '10vh' }}>
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
              <input type="text" name="condition" onChange={handleConditionChange} required />
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
              <input type="text" name="label" onChange={handleGroupChange} required />
              <label>group type</label>
              <input type="text" name="group_type" onChange={handleGroupChange} required />
              <label>description</label>
              <input type="text" name="description" onChange={handleGroupChange} required />
              <label>intervention name</label>
              <input type="text" name="intervention_name" onChange={handleGroupChange} required />
              <button type='submit'>Add</button>
            </form> : ""}
            {mappedArmGroups}
          </div>
        </Card.Body>
      </Card>
      <Card style={{ minHeight: '30vh', width: '85vw' }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6>Locations</h6>
          <Button variant="primary" name="trials" onClick={handleAddLocation}>Add Location</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '20vh' }}>
          <div className='locations-trial-info'>
            {addLocation ? <form onSubmit={handleLocationSubmit}>
              <label>facility</label>
              <input type="text" name="facility" onChange={handleLocationChange} required />
              <label>city</label>
              <input type="text" name="city" onChange={handleLocationChange} required />
              <label>state</label>
              <input type="text" name="state" onChange={handleLocationChange} required />
              <label>country</label>
              <input type="text" name="country" onChange={handleLocationChange} required />
              <button type='submit'>Add</button>
            </form> : ""}
            <table className="table" style={{ width: "80vw" }}>
              <thead>
                <tr>
                  <th scope="col">Facility</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {mappedLocations}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <Card style={{ minHeight: '30vh', width: '85vw' }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6>Outcomes</h6>
          <Button variant="primary" name="trials" onClick={handleAddOutcome}>Add Outcome</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '20vh' }}>
          <div className='outcomes-trial-info'>
            {addOutcome ? <form onSubmit={handleOutcomeSubmit}>
              <label>Outcome Type: </label>
              <input type="text" name="outcome_type" onChange={handleOutcomeChange} required />
              <label>Outcome Measure</label>
              <input type="text" name="outcome_measure" onChange={handleOutcomeChange} required />
              <label>Outcome Description</label>
              <textarea type="text" name="outcome_description" onChange={handleOutcomeChange} required />
              <label>Outcome Timeframe</label>
              <input type="text" name="outcome_timeframe" onChange={handleOutcomeChange} required />
              <button type='submit'>Add</button>
            </form> : ""}
            <table className="table" style={{ width: "80vw" }}>
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Measure</th>
                  <th scope="col">Timeframe</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {mappedOutcomes}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <Button onClick={handleDeleteClick} id="trial-delete-button">Delete</Button>
      <Modal show={showModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default TrialPage