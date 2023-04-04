import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DateTimePicker from 'react-datetime-picker';
import TrialsChart from './TrialsChart';
import PatientCharts from './PatientsChart'

const localizer = momentLocalizer(moment);

function Dashboard({ trials, notes })
{
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState([])

  useEffect(() =>
  {
    fetch('/events')
      .then(response => response.json())
      .then(data =>
      {
        const updatedEvents = data.map(event =>
        {
          return {
            ...event,
            start: moment(event.start).toDate(), // convert to JS Date object
            end: moment(event.end).toDate(), // convert to JS Date object
          };
        });
        setEvents(updatedEvents);
      })
      .catch(error => console.error(error));
  }, [newEvent]);


  function handleClick(e)
  {
    history.push(`/${e.target.name}`);
  }

  function handleSelectSlot({ start })
  {
    setSelectedDate(start);
    setShowModal(true);
  }

  function handleCloseModal()
  {
    setShowModal(false);
    setTitle('');
    setStartTime(new Date());
    setEndTime(new Date());
    setLocation('');
    setDescription('');
    setSelectedDate(null);
  }

  function handleSaveEvent()
  {
    const newEvent = {
      title,
      start: startTime,
      end: endTime,
      location,
      description,
    };

    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then(response => response.json())
      .then(data =>
      {
        setEvents([...events, {
          ...data,
          start: moment(data.start).toDate(),
          end: moment(data.end).toDate()
        }]);
        handleCloseModal();
      })
      .then(data => setNewEvent(data))
      .catch(error => console.error(error));
  }

  return (
    <div className="dashboard-container">
      <div className="row">
        <div className="col">
          <Card style={{ minHeight: '40vh' }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Trials</h5>
              <Button variant="primary" name="trials" onClick={handleClick}>
                View Trials
              </Button>
            </Card.Header>
            <Card.Body>
              <TrialsChart trials={trials} />
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card style={{ height: '40vh' }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Patients</h5>
              <Button variant="primary" name="patients" onClick={handleClick}>
                View Patients
              </Button>
            </Card.Header>
            <Card.Body>
              <PatientCharts />
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="calendar-container">
          <Card style={{ minHeight: '40vh', width: '58vw' }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Calendar</h5>
            </Card.Header>
            <Card.Body style={{ height: '50vh' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <DateTimePicker value={startTime} onChange={setStartTime} />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <DateTimePicker value={endTime} onChange={setEndTime} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter location" value={location} onChange={e => setLocation(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Dashboard