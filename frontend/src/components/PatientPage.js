import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, Button, Modal } from 'react-bootstrap';
import FileUploadForm from './FileUploadForm';

function PatientPage({ patientId, newNote, setTrialId, setDeletedPatient })
{
  console.log(patientId)
  const [info, setInfo] = useState(null);
  const [newMeasurement, setNewMeasurement] = useState([])
  const [currentChartMeasurement, setCurrentChartMeasurement] = useState('')
  const [patient, setPatient] = useState([])
  const [pdfUrl, setPdfUrl] = useState('')
  const [imageUrl, setImageUrl] = useState(null);
  const [addDocument, setAddDocument] = useState(false)

  let history = useHistory();
  function handleClick(e)
  {
    history.push(`/notes/create`);
  }

  function handleMeasurementChange(e)
  {
    setCurrentChartMeasurement(e.target.value)
    console.log(e.target.value)
  }

  function handleFileUpload(url)
  {
    setImageUrl(url);
  }

  function handleUploadClick()
  {
    setAddDocument(!addDocument)
  }

  useEffect(function ()
  {
    fetch(`/patients/${patientId}`)
      .then(function (resp)
      {
        return resp.json()
      })
      .then(function (data)
      {
        console.log(data)
        return setPatient(data)
      })
  }, [newNote, newMeasurement, imageUrl, pdfUrl])

  const initialState = {
    patient_id: patientId,
    date: '',
    measurement: '',
    measurement_label: '',
  };

  const [formState, setFormState] = useState(initialState);
  const handleChange = (e) =>
  {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log({ ...formState, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    fetch(`/measurements`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formState)
    })
      .then(res => res.json())
      .then(data => setNewMeasurement(data))
  }

  const { id, first_name, last_name, address, gender, height, weight, trial, trial_id, notes, conditions, measurements, documents } = patient

  function handleTrialClick()
  {
    setTrialId(trial_id)
    history.push(`/trials/${trial_id}`);
  }
  const sortedNotes = notes ? notes.sort((a, b) => new Date(b.date) - new Date(a.date)) : "";
  const mappedNotes = sortedNotes ? sortedNotes.map(function (note)
  {
    return (
      <tr key={note.id}>
        <td>{note.date}</td>
        <td>{note.title}</td>
        <td>{note.description}</td>
      </tr>
    );
  }) : "";

  const mappedConditions = conditions ? conditions.map(function (condition)
  {
    return <li>{condition.condition}</li>
  }) : "";

  const sortedMeasurements = measurements ? measurements.sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  const mappedMeasurements = sortedMeasurements.map(function (measurement)
  {
    return <tr>
      <td>{measurement.date}</td>
      <td>{measurement.measurement}</td>
      <td>{measurement.measurement_label}</td>
    </tr>
  });

  const data = measurements
    ? measurements.filter((measurement) => measurement.measurement_label === currentChartMeasurement)
      .map((measurement) => ({ date: measurement.date, measurement: measurement.measurement, measurement_label: measurement.measurement_label }))
    : [];

  const dataMax = Math.max(...data.map((measurement) => measurement.measurement));
  const dataMin = Math.min(...data.map((measurement) => measurement.measurement));

  const mappedOptions = measurements
    ? [...new Set(measurements.map((measurement) => measurement.measurement_label))]
      .map((measurement_label) => (
        <option value={measurement_label}>{measurement_label}</option>
      ))
    : "";

  const mappedDocuments = documents
    ? documents.map(document => (
      <div className='mapped-documents'>
        <h2>{document.title}</h2>
        {/* <embed src={document.pdf_url} width="800px" height="2100px" /> */}
        <a href={document.pdf_url} target="_blank" rel="noopener noreferrer">Link</a>
        <iframe src={document.pdf_url}></iframe>
      </div>
    )) : "";

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () =>
  {
    setShowModal(true);
  }

  const handleCancelDelete = () =>
  {
    setShowModal(false);
  }

  const handleConfirmDelete = () =>
  {
    fetch(`/patients/${patientId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
      },
    })
      .then(res => res.text())
      .then(data => setDeletedPatient(data))
      .then(setDeletedPatient([]))
      .then(setShowModal(false))
      .then(history.push(`/trials/${trial_id}`))
  }

  return (
    <div className='patientPage'>
      <Card style={{ minHeight: '20vh' }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Patient - {first_name} {last_name}</h3>
          <Button variant="primary" name="trials" onClick={handleTrialClick}>View Trial</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '10vh' }}>
          <div className='patient-info'>
            <div className='patient-general-info'>
              <p><b>Name:</b> {first_name} {last_name}</p>
              <p><b>Address:</b> {address}</p>
              <p><b>Gender:</b> {gender}</p>
              <p><b>Height:</b> {height}in</p>
              <p><b>Weight</b> {weight}lbs</p>
            </div>
            {
              trial && (
                <div className='patient-trial-info'>
                  <p><b>Trial NCTId:</b> {trial.NCTId}</p>
                  <p><b>Trial Title:</b> {trial.brief_title}</p>
                  <p><b>Trial Summary:</b> {trial.brief_summary}</p>
                  <p><b>Placebo Group:</b> {patient.placebo ? "True" : "False"}</p>
                </div>
              )
            }
            <div className='patient-condition-info'>
              <ul> <b>Conditions:</b> {mappedConditions}</ul>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header><h6>Measurements</h6></Card.Header>
        <Card.Body>
          <div className='patient-chart-div'>
            <LineChart
              width={1000}
              height={400}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[dataMin * .80, dataMax * 1.20]}
              />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="measurement" stroke="#118ab2" activeDot={{ r: 8, fill: 'red' }} name={currentChartMeasurement} />
            </LineChart>
            <select onChange={handleMeasurementChange}>
              <option>Select Measurement</option>
              {mappedOptions}
            </select>
          </div>
          <br></br>
          <div>
            <form onSubmit={handleSubmit} id='measurement-form'>
              <label for="date">Date: </label>
              <input type="date" id='date' name='date' onChange={handleChange}></input>
              <label for="measurement">Measurement Value: </label>
              <input type="text" id='measurement' name='measurement' onChange={handleChange} placeholder='EX. "125" (Must be numerical)'></input>
              <label for="measurement_label">Measurement Unit: </label>
              <input type="text" id='measurement_label' name='measurement_label' onChange={handleChange} placeholder='EX "lbs"'></input>
              <button type='submit'>Submit Measurement</button>
            </form>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Measurement</th>
                  <th scope="col">Label</th>
                </tr>
              </thead>
              <tbody>
                {mappedMeasurements}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6>Notes</h6>
          <Button variant="primary" onClick={handleClick}>Create Note</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '10vh' }}>
          <div className='patient-info'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {mappedNotes}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6>Documents</h6>
          <Button variant="primary" onClick={handleUploadClick}>Upload Document</Button>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', minHeight: '10vh' }}>
          <div className='patient-document-info'>
            {addDocument ? <FileUploadForm onUpload={handleFileUpload} patientId={patientId} setPdfUrl={setPdfUrl} setAddDocument={setAddDocument} /> : ""}
            {mappedDocuments}
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
    </div>
  )
}

export default PatientPage