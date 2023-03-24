import React from 'react'
import { useHistory } from 'react-router-dom';
import PatientsChart from './PatientsChart';
import TrialsChart from './TrialsChart';
import { Card, Button } from 'react-bootstrap';

function Dashboard({ trials }) {
  let history = useHistory();
  function handleClick(e) {
    history.push(`/${e.target.name}`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Card style={{ height: "40vh" }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Trials</h5>
              <Button variant="primary" name="trials" onClick={handleClick}>View Trials</Button>
            </Card.Header>
            <Card.Body>
              <TrialsChart trials={trials} />
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card style={{ height: "40vh" }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Patients</h5>
              <Button variant="primary" name="patients" onClick={handleClick}>View Patients</Button>
            </Card.Header>
            <Card.Body>
              <PatientsChart />
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Card style={{ height: "40vh" }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Chart 3</h5>
              <Button variant="primary">Button 3</Button>
            </Card.Header>
            <Card.Body>
              {/* insert chart component here */}
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card style={{ height: "40vh" }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Chart 4</h5>
              <Button variant="primary">Button 4</Button>
            </Card.Header>
            <Card.Body>
              {/* insert chart component here */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard