import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function NotesContainer({ setNotes, notes, setPatientId, userId })
{
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  let history = useHistory()

  useEffect(() =>
  {
    fetch('http://localhost:3000/notes')
      .then((resp) => resp.json())
      .then((data) =>
      {
        setNotes(data);
        setTotalPages(Math.ceil(data.length / 10));
      });
  }, [userId]);

  function handleBack()
  {
    setPage((prevPage) => prevPage - 1);
  }

  function handleNext()
  {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handleChange(e)
  {
    setSearchValue(e.target.value);
  }

  function handleClick(e)
  {
    setPatientId(e.target.id);
    history.push(`/patients/${e.target.id}`);
  }

  function paginateNotes()
  {
    const notesPerPage = 16;
    const totalNotes = notes.length;
    const startIndex = (page - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    const paginatedNotes = notes
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((note) =>
        note.patient.last_name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(startIndex, endIndex);
    return paginatedNotes;
  }

  const paginatedNotes = paginateNotes();

  const mappedNotes = paginatedNotes
    ? paginatedNotes.map((note) => (
      <tr key={note.id}>
        <td>{note.date}</td>
        <td>
          {note.patient.first_name} {note.patient.last_name}
        </td>
        <td>{note.title}</td>
        <td>{note.description}</td>
        <td>
          <button onClick={handleClick} id={note.patient_id}>
            View Patient
          </button>
        </td>
      </tr>
    ))
    : '';

  return (
    <div className='notesContainer'>
      <div className='notes-container-header'>
        <div>
          <input onChange={handleChange} placeholder='Enter Last Name' />
        </div>
      </div>
      <div className='noteCardStorage'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Date</th>
              <th scope='col'>Patient</th>
              <th scope='col'>Title</th>
              <th scope='col'>Description</th>
              <th scope='col'>View</th>
            </tr>
          </thead>
          <tbody>{mappedNotes}</tbody>
        </table>
        <div className='pagination'>
          <button onClick={handleBack} disabled={page === 1}>
            Previous
          </button>
          <button onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesContainer;

