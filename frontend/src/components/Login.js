import React, { Component } from 'react'
// import Lottie from 'react-lottie';
import animationData from '../lf20_ymEv4F (1).json';

function Login()
{
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        // rendererSettings: {
        // preserveAspectRatio: 'xMidYMid slice'
        // }
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
                        // onSubmit={handleSubmit}
                        >
                            <input name="username" type="text"
                            // required onChange={handleChange} 
                            // value={formState.username} placeholder="username" 
                            />
                            <input name="password" type="password"
                            // required onChange={handleChange} 
                            // value={formState.password} placeholder="password" 
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