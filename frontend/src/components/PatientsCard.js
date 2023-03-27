import React, { Component, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function PatientsCard({ patient, setPatientId })
{
  const { id, first_name, last_name, address, gender, height, age, weight, trial, trial_id, notes, conditions, measurements } = patient

  let history = useHistory();
  function handleClick()
  {
    setPatientId(id)
    history.push(`/patients/${id}`);
    console.log(id)
  }
  return (
    <div className='patientsCard'>
      <Card style={{ minHeight: "25vh" }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>{first_name} {last_name}</h5>
          <Button variant="primary" name="trials" onClick={handleClick}>View Patient Details</Button >
        </Card.Header>
        <Card.Body>
          <p>Gender: {gender}</p>
          <p>Age: {age}</p>
          <p>Trial: {trial.brief_title}</p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PatientsCard