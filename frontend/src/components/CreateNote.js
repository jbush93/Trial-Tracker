import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

function CreateNote({ patientId, setNewNote })
{
    // console.log(patientId)
    let history = useHistory();

    const initialState = {
        patient_id: patientId,
        date: '',
        title: '',
        description: '',
    };

    //create form state
    const [formState, setFormState] = useState(initialState);
    const handleChange = (e) =>
    {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        // console.log({ ...formState, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        fetch(`http://localhost:3000/notes`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formState)
        })
            .then(res => res.json())
            .then(data => setNewNote(data))
            .then(history.push(`/patients/${patientId}`))
    }

    return (
        <div className='home'>
            <div className='homeItem'>
                <h1>Create Note</h1>
                <form onSubmit={handleSubmit}>
                    <label for="date">Date: </label>
                    <input type="date" id='date-input' name='date' onChange={handleChange}></input>
                    <label for="title">Title: </label>
                    <input type="text" id='title' name='title' onChange={handleChange}></input>
                    <label for="description">Description: </label>
                    <input type="text" id='description' name='description' onChange={handleChange}></input>
                    <button type='submit'>Create Note</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote