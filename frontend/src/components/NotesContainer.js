import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import NoteCard from './NoteCard'


function NotesContainer({ setNotes, notes, setPatientId })
{

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchValue, setSearchValue] = useState("")

    useEffect(function ()
    {
        fetch("http://localhost:3000/notes")
            .then(function (resp)
            {
                return resp.json()
            })
            .then(function (data)
            {
                console.log(data)
                return setNotes(data)
            })
    }, [])

    function handleBack()
    {
        setPage(page - 1)
    }
    function handleNext()
    {
        if (page < totalPages) { // Check if we are not on the last page
            setPage(page + 1)
        }
    }

    function handleChange(e)
    {
        console.log(e.target.value)
        setSearchValue(e.target.value)
    }

    const filteredNotes = notes.filter((note) => (
        note.patient.last_name.toLowerCase().includes(searchValue.toLowerCase())
    ));

    // const mappedNotes = notes.map(function (note)
    // {
    //     return <NoteCard note={note} setPatientId={setPatientId} />
    // })

    let history = useHistory();
    function handleClick(e)
    {
        setPatientId(e.target.id)
        history.push(`/patients/${e.target.id}`);
    }

    const mappedNotes = filteredNotes ? filteredNotes.map(function (note)
    {
        return <tr>
            <td>{note.date}</td>
            <td>{note.patient.first_name} {note.patient.last_name}</td>
            <td>{note.title}</td>
            <td>{note.description}</td>
            <td><button onClick={handleClick} id={note.patient_id}>View Patient</button></td>
        </tr>;
    }) : "";


    return (
        <div className='notesContainer'>
            <div>
                <label>Search: </label>
                <input onChange={handleChange} placeholder='Enter Last Name' />
            </div>
            <div className="noteCardStorage">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Patient</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedNotes}
                    </tbody>
                </table>
            </div>
            <div className='patientsButtons'>
                pagination?
                <button onClick={handleBack} disabled={page === 1}>Previous Page</button>
                <button onClick={handleNext} disabled={page === totalPages}>Next Page</button>
            </div>
        </div>
    )
}

export default NotesContainer