import React, { useEffect, useState } from 'react'
import PatientsCard from './PatientsCard'
import { useHistory } from 'react-router-dom';

function PatientsContainer({ setPatientId }) {

  let history = useHistory();
  const [patients, setPatients] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(function () {
    fetch(`http://localhost:3000/patients?page=${page}`)
      .then(function (resp) {
        // Get the total number of pages from the response headers
        const totalPages = parseInt(resp.headers.get('Total-Pages'))
        setTotalPages(totalPages)
        return resp.json()
      })
      .then(function (data) {
        return setPatients(data)
      })
  }, [page])

  function handleClick(e) {
    history.push(`/patients/create`);
  }
  function handleBack() {
    setPage(page - 1)
  }
  function handleNext() {
    if (page < totalPages) { // Check if we are not on the last page
      setPage(page + 1)
    }
  }

  const mappedPatients = patients.map((patient) =>
  (
    <PatientsCard patient={patient} setPatientId={setPatientId} />
  ))

  return (
    <div className='patientsContainer'>
      <div className="patients-container-header">
        <h1>Patients</h1>
        <button onClick={handleClick}>create new</button>
      </div>
      <div className='patientCardStorage'>
        {mappedPatients}
      </div>
      <div className='patientsButtons'>
        <button onClick={handleBack} disabled={page === 1}>Previous Page</button>
        <button onClick={handleNext} disabled={page === totalPages}>Next Page</button>
      </div>
    </div>
  )
}

export default PatientsContainer