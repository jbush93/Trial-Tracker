import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateTrial({ setTrialId, trialId })
{
  let history = useHistory();
  const [study, setStudy] = useState({
    NCTId: '',
    organization_name: '',
    brief_title: '',
    official_title: '',
    overall_status: '',
    start_date: '',
    primary_completion_date: '',
    primary_completion_date_type: '',
    lead_sponsor: '',
    is_fda_regulated_drug: '',
    is_fda_regulated_device: '',
    brief_summary: '',
    detailed_description: '',
    study_type: '',
    phase: '',
    intervention_type: '',
    intervention_description: '',
    eligibility_criteria: '',
    gender: '',
    minimum_age: 0,
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  });

  const handleChange = (e) =>
  {
    setStudy(study => ({ ...study, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    fetch(`http://localhost:3000/trials`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(study)
    })
      .then(res => res.json())
      .then(data => setTrialId(data.id))
      .then(data => history.push(`/trials/${trialId}`))
  }



  return (
    <div className='create-trials'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <label>NCTId:</label>
          <input type="text" className="form-control" name="NCTId" value={study.NCTId} onChange={handleChange} required /><br />

          <label>Organization Name:</label>
          <input type="text" className="form-control" name="organization_name" value={study.organization_name} onChange={handleChange} required /><br />

          <label>Brief Title:</label>
          <input type="text" className="form-control" name="brief_title" value={study.brief_title} onChange={handleChange} required /><br />

          <label>Official Title:</label>
          <input type="text" className="form-control" name="official_title" value={study.official_title} onChange={handleChange} required /><br />

          <label>Overall Status:</label>
          <input type="text" className="form-control" name="overall_status" value={study.overall_status} onChange={handleChange} required /><br />

          <label>Start Date:</label>
          <input type="text" className="form-control" name="start_date" value={study.start_date} onChange={handleChange} required /><br />

          <label>Primary Completion Date:</label>
          <input type="text" className="form-control" name="primary_completion_date" value={study.primary_completion_date} onChange={handleChange} required /><br />

          <label>Primary Completion Type:</label>
          <input type="text" className="form-control" name="primary_completion_date_type" value={study.primary_completion_date_type} onChange={handleChange} required /><br />

          <label>Lead Sponsor:</label>
          <input type="text" className="form-control" name="lead_sponsor" value={study.lead_sponsor} onChange={handleChange} required /><br />

          <label>FDA Regulated Drug:</label>
          <input type="text" className="form-control" name="is_fda_regulated_drug" value={study.is_fda_regulated_drug} onChange={handleChange} required /><br />

          <label>FDA Regulated Device:</label>
          <input type="text" className="form-control" name="is_fda_regulated_device" value={study.is_fda_regulated_device} onChange={handleChange} required /><br />

          <label>Brief Summary:</label>
          <textarea name="brief_summary" className="form-control" value={study.brief_summary} onChange={handleChange} required /><br />

          <label>Detailed Description:</label>
          <textarea name="detailed_description" className="form-control" value={study.detailed_description} onChange={handleChange} required /><br />

          <label>Study Type:</label>
          <input type="text" className="form-control" name="study_type" value={study.study_type} onChange={handleChange} required /><br />

          <label>Phase:</label>
          <input type="text" className="form-control" name="phase" value={study.phase} onChange={handleChange} required /><br />

          <label>Intervention Type:</label>
          <input type="text" className="form-control" name="intervention_type" value={study.intervention_type} onChange={handleChange} required /><br />

          <label>Intervention Description:</label>
          <textarea name="intervention_description" className="form-control" value={study.intervention_description} onChange={handleChange} required /><br />

          <label>Eligibility Criteria:</label>
          <textarea name="eligibility_criteria" className="form-control" value={study.eligibility_criteria} onChange={handleChange} required /><br />

          <label>Gender:</label>
          <input type="text" name="gender" className="form-control" value={study.gender} onChange={handleChange} /><br required />

          <label>Minimum Age:</label>
          <input type="number" name="minimum_age" className="form-control" value={study.minimum_age} onChange={handleChange} required /><br />

          <label>Contact Name:</label>
          <input type="text" name="contact_name" className="form-control" value={study.contact_name} onChange={handleChange} required /><br />

          <label>Contact Phone:</label>
          <input type="text" name="contact_phone" className="form-control" value={study.contact_phone} onChange={handleChange} required /><br />

          <label>Contact Email:</label>
          <input type="text" name="contact_email" className="form-control" value={study.contact_email} onChange={handleChange} required /><br />
          <button type="submit" className="btn btn-primary">submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateTrial