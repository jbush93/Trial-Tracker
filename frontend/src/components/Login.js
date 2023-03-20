import React, { Component, useState, useEffect } from 'react'
// import Lottie from 'react-lottie';
import animationData from '../lf20_ymEv4F (1).json';
import { useHistory } from 'react-router-dom';

function Login({ setLoggedIn })
{
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        // rendererSettings: {
        // preserveAspectRatio: 'xMidYMid slice'
        // }
    }

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
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
            .then(res =>
            {
                if (res.ok) {
                    res.json().then(data => setLoggedIn(true));
                } else {
                    res.json().then(obj => console.log(obj.error));
                }
            })
    }

    return (
        <div className='login'>
            <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
                {/* <Lottie options={defaultOptions} /> */}
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

                    {/* login form */}
                    <div id="login-form">
                        <form className="form"
                            onSubmit={handleSubmit}
                        >
                            <input name="email" type="text"
                                required onChange={handleChange}
                                placeholder="email"
                            />
                            <input name="password" type="password"
                                required onChange={handleChange}
                                placeholder="password"
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