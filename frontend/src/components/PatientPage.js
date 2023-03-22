import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import FileUploadForm from './FileUploadForm';
import PdfViewer from './PdfViewer';

function PatientPage({ patientId, newNote, setTrialId })
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
        // console.log(e.target.name)
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
        fetch(`http://localhost:3000/patients/${patientId}`)
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

    //create form state
    const [formState, setFormState] = useState(initialState);
    const handleChange = (e) =>
    {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        console.log({ ...formState, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        fetch(`http://localhost:3000/measurements`, {
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
        // console.log(trial_id)
    }
    const mappedNotes = notes ? notes.map(function (note)
    {
        return <tr>
            <td>{note.date}</td>
            <td>{note.title}</td>
            <td>{note.description}</td>
        </tr>;
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
            <div>
                <h2>{document.title}</h2>
                {/* <embed src={document.pdf_url} width="800px" height="2100px" /> */}
                <iframe src={document.pdf_url}></iframe>
            </div>
        )) : "";



    return (
        <div className='patientPage'>
            <Card style={{ minHeight: '20vh' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h3>Patient: {first_name} {last_name}</h3>
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
                        // margin={{
                        //     top: 5,
                        //     right: 5,
                        //     left: 30,
                        //     bottom: 5,
                        // }}
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
                            <input type="text" id='measurement' name='measurement' onChange={handleChange}></input>
                            <label for="measurement_label">Measurement Unit: </label>
                            <input type="text" id='measurement_label' name='measurement_label' onChange={handleChange}></input>
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
                <Card.Body className="d-flex justify-content-between align-items-center" style={{ width: '80vw', height: '10vh' }}>
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
        </div>
    )
}

export default PatientPage