import React, { Component, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function TrialsCard({ trial, setTrialId })
{
    const { id, NCTId, brief_title, detailed_description, organization_name, lead_sponsor, patients, study_type, phase, start_date, overall_status, primary_completion_date, primary_completion_date_type, conditions, locations, arm_groups, outcomes, contact_name, contact_email, contact_phone } = trial


    let history = useHistory();
    function handleClick()
    {
        setTrialId(id)
        history.push(`/trials/${id}`);
    }
    return (
        <div className='trialsCard'>
            <Card style={{ height: "30vh" }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>Trial {id} - {brief_title}</h5>
                    <Button variant="primary" name="trials" onClick={handleClick}>View Details</Button>
                </Card.Header>
                <Card.Body>
                    <p>Trial: {NCTId}</p>
                    <p>Title: {brief_title}</p>
                    <p>Phase: {phase}</p>
                    <p>Status: {overall_status}</p>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TrialsCard