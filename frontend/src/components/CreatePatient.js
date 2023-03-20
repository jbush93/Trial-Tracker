import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function CreatePatient({ setPatientId, patientId, trialId })
{
    let history = useHistory();
    const [formData, setFormData] = useState({
        trial_id: trialId,
        first_name: "",
        last_name: "",
        address: "",
        gender: "",
        weight: "",
        height: "",
        age: "",
        placebo: false,
    });

    const handleChange = (e) =>
    {
        setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        fetch(`http://localhost:3000/patients`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => setPatientId(data.id))
            .then(data => history.push(`/patients/${patientId}`))
    }

    return (
        <div className='create-trials'>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} /><br />

                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} /><br />

                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} /><br />

                <label>Gender:</label>
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} /><br />

                <label>Weight:</label>
                <input type="text" name="weight" value={formData.weight} onChange={handleChange} /><br />

                <label>Height:</label>
                <input type="text" name="height" value={formData.height} onChange={handleChange} /><br />

                <label>Age:</label>
                <input type="text" name="age" value={formData.age} onChange={handleChange} /><br />

                <label>Placebo Group?</label>
                <select name="placebo" value={formData.placebo} onChange={handleChange}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default CreatePatient