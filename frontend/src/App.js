import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';


import Header from './components/Header';
import SideNavbar from './components/SideNavbar'
import Home from './components/Home'
import Database from './components/Database'
import MyAccount from './components/MyAccount'
import PatientsContainer from './components/PatientsContainer'
import TrialsContainer from './components/TrialsContainer'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import TrialPage from './components/TrialPage';
import PatientPage from './components/PatientPage';
import NotesContainer from './components/NotesContainer';
import CreateTrial from './components/CreateTrial';
import CreatePatient from './components/CreatePatient';
import CreateNote from './components/CreateNote';
import TrialsChart from './components/TrialsChart';

function App()
{

  const [trials, setTrials] = useState([])
  const [loggedIn, setLoggedIn] = useState(true)
  const [trialId, setTrialId] = useState()
  const [patientId, setPatientId] = useState()
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState([])

  useEffect(function ()
  {
    fetch("http://localhost:3000/trials")
      .then(function (resp)
      {
        return resp.json()
      })
      .then(function (data)
      {
        console.log(data)
        return setTrials(data)
      })
  }, [])

  return (
    <div className="App">
      {(loggedIn === true) ? (
        <div>
          {/* <Header /> */}
          < SideNavbar />

          <Switch>

            {/* <Route path='/home'>
              <Home />
            </Route>

            <Route path='/database'>
              <Database />
            </Route> */}

            <Route path='/dashboard'>
              <Dashboard trials={trials} />
            </Route>

            <Route path='/trials/create'>
              <CreateTrial />
            </Route>

            <Route path='/trials/:id'>
              <TrialPage trialId={trialId} setPatientId={setPatientId} />
            </Route>

            <Route path='/trials'>
              <TrialsContainer trials={trials} setTrialId={setTrialId} />
            </Route>

            <Route path='/patients/create'>
              <CreatePatient />
            </Route>

            <Route path='/patients/:id'>
              <PatientPage patientId={patientId} newNote={newNote} setTrialId={setTrialId} />
            </Route>

            <Route path='/patients'>
              <PatientsContainer setPatientId={setPatientId} />
            </Route>

            <Route path='/notes/create'>
              <CreateNote patientId={patientId} setNewNote={setNewNote} />
            </Route>

            {/* <Route path='/notes/:id'>
              <PatientPage />
            </Route> */}

            <Route path='/notes'>
              <NotesContainer setNotes={setNotes} newNote={newNote} />
            </Route>

            <Route path='/myaccount'>
              <MyAccount />
            </Route>

          </Switch>
        </div>
      ) : (
        <Login />
      )
      }

    </div>
  );
}

export default App;
