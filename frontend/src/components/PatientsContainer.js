import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PatientsCard from './PatientsCard';
import { debounce } from 'lodash';

function PatientsContainer({ setPatientId })
{
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  function handleBack()
  {
    setPage(page - 1);
  }

  function handleNext()
  {
    setPage(page + 1);
  }

  function handleSearch(e)
  {
    setPage(1);
    setSearchQuery(e.target.value);
    console.log(e.target.value)
  }

  const fetchPatients = () =>
  {
    let url = `http://localhost:3000/patients?page=${page}`;
    if (searchQuery) {
      url += `&query=${searchQuery}`;
    }

    fetch(url)
      .then((resp) =>
      {
        const totalPages = parseInt(resp.headers.get('Total-Pages'));
        setTotalPages(totalPages);
        return resp.json();
      })
      .then((data) =>
      {
        setPatients(data);
      });
  };

  const debouncedFetchPatients = debounce(fetchPatients, 750);

  useEffect(() =>
  {
    console.log(searchQuery)
    debouncedFetchPatients();
    return () => debouncedFetchPatients.cancel();
  }, [page, searchQuery]);

  const mappedPatients = patients.map((patient) => (
    <PatientsCard patient={patient} setPatientId={setPatientId} />
  ));

  return (
    <div className='patientsContainer'>
      <div className='patients-container-header'>
        <h1>Patients</h1>
        <form onChange={handleSearch}>
          <label>Search: </label>
          <input type='text' name='search' placeholder='Enter Last Name' />
          {/* <button type='submit'>Search</button> */}
        </form>
      </div>
      <div className='patientCardStorage'>{mappedPatients}</div>
      <div className='patientsButtons'>
        <button onClick={handleBack} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default PatientsContainer;