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
    gender: "Male",
    weight: "",
    height: "",
    age: "",
    placebo: false,
  });

  const handleChange = (e) =>
  {
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
    console.log(e.target.value);
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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="first_name" className="form-control" value={formData.first_name} onChange={handleChange} required /><br />

          <label>Last Name:</label>
          <input type="text" name="last_name" className="form-control" value={formData.last_name} onChange={handleChange} required /><br />

          <label>Address:</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required /><br />

          <label>Gender:</label>
          <select name="placebo" className="form-control" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select><br />

          <label>Weight:</label>
          <input type="text" name="weight" className="form-control" value={formData.weight} onChange={handleChange} required /><br />

          <label>Height:</label>
          <input type="text" name="height" className="form-control" value={formData.height} onChange={handleChange} required /><br />

          <label>Age:</label>
          <input type="text" name="age" className="form-control" value={formData.age} onChange={handleChange} required /><br />

          <label>Placebo Group?</label>
          <select name="placebo" value={formData.placebo} className="form-control" onChange={handleChange}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select> <br />
          <button type="submit" className="btn btn-primary">submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePatient