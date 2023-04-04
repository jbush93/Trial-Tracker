import React, { useState } from 'react'

function Login({ setLoggedIn, setUserId })
{
  let initialState = {
    email: '',
    password: ''
  }
  const [formState, setFormState] = useState(initialState);
  const handleChange = (e) =>
  {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e)
  {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
      .then(res =>
      {
        if (res.ok) {
          res.json().then(data =>
          {
            setLoggedIn(true)
            setUserId(data.id)
          })
        } else {
          res.json().then(obj => console.log(obj.error));
        }
      })
  }

  return (
    <div className='login'>
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <div id="login-form-container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}>
          <div className="login-title">
            <h1>Trial Tracker</h1>
          </div>
          <div id="login-form">
            <form className="form"
              onSubmit={handleSubmit}
            >
              <input name="email" type="text"
                required onChange={handleChange}
                value="123@test.com"
              />
              <input name="password" type="password"
                required onChange={handleChange}
                value="password"
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login