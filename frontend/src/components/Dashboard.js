import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import PatientsChart from './PatientsChart';
import TrialsChart from './TrialsChart';
import { Card, Button } from 'react-bootstrap';



function Dashboard({ trials })
{
    let history = useHistory();
    function handleClick(e)
    {
        // console.log(e.target.name)
        history.push(`/${e.target.name}`);
    }

    const data = [
        { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
    ];

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