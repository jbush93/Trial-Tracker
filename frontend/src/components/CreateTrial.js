import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
        <label>NCTId:</label>
        <input type="text" name="NCTId" value={study.NCTId} onChange={handleChange} /><br />

        <label>Organization Name:</label>
        <input type="text" name="organization_name" value={study.organization_name} onChange={handleChange} /><br />

        <label>Brief Title:</label>
        <input type="text" name="brief_title" value={study.brief_title} onChange={handleChange} /><br />

        <label>Official Title:</label>
        <input type="text" name="official_title" value={study.official_title} onChange={handleChange} /><br />

        <label>Overall Status:</label>
        <input type="text" name="overall_status" value={study.overall_status} onChange={handleChange} /><br />

        <label>Start Date:</label>
        <input type="text" name="start_date" value={study.start_date} onChange={handleChange} /><br />

        <label>Primary Completion Date:</label>
        <input type="text" name="primary_completion_date" value={study.primary_completion_date} onChange={handleChange} /><br />

        <label>Primary Completion Type:</label>
        <input type="text" name="primary_completion_date_type" value={study.primary_completion_date_type} onChange={handleChange} /><br />

        <label>Lead Sponsor:</label>
        <input type="text" name="lead_sponsor" value={study.lead_sponsor} onChange={handleChange} /><br />

        <label>FDA Regulated Drug:</label>
        <input type="text" name="is_fda_regulated_drug" value={study.is_fda_regulated_drug} onChange={handleChange} /><br />

        <label>FDA Regulated Device:</label>
        <input type="text" name="is_fda_regulated_device" value={study.is_fda_regulated_device} onChange={handleChange} /><br />

        <label>Brief Summary:</label>
        <textarea name="brief_summary" value={study.brief_summary} onChange={handleChange} /><br />

        <label>Detailed Description:</label>
        <textarea name="detailed_description" value={study.detailed_description} onChange={handleChange} /><br />

        <label>Study Type:</label>
        <input type="text" name="study_type" value={study.study_type} onChange={handleChange} /><br />

        <label>Phase:</label>
        <input type="text" name="phase" value={study.phase} onChange={handleChange} /><br />

        <label>Intervention Type:</label>
        <input type="text" name="intervention_type" value={study.intervention_type} onChange={handleChange} /><br />

        <label>Intervention Description:</label>
        <textarea name="intervention_description" value={study.intervention_description} onChange={handleChange} /><br />

        <label>Eligibility Criteria:</label>
        <textarea name="eligibility_criteria" value={study.eligibility_criteria} onChange={handleChange} /><br />

        <label>Gender:</label>
        <input type="text" name="gender" value={study.gender} onChange={handleChange} /><br />

        <label>Minimum Age:</label>
        <input type="number" name="minimum_age" value={study.minimum_age} onChange={handleChange} /><br />

        <label>Contact Name:</label>
        <input type="text" name="contact_name" value={study.contact_name} onChange={handleChange} /><br />

        <label>Contact Phone:</label>
        <input type="text" name="contact_phone" value={study.contact_phone} onChange={handleChange} /><br />

        <label>Contact Email:</label>
        <input type="text" name="contact_email" value={study.contact_email} onChange={handleChange} /><br />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default CreateTrial