import React from 'react';

import {useNavigate} from 'react-router-dom';
import {MessageDialog} from './messageDialog';

import './login.css';

export function Unauthenticated(props) {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }
    
    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }
    
    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({email: username, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
          localStorage.setItem('userName', username);
          props.onLogin(username);
          navigate('/goals');
        } else {
          const body = await response.json();
          setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <>
            <div className='form'>
                <label htmlFor="username">
                    <h2>Login or Create Account:</h2>
                </label>
                <input 
                    id='username'
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username...'
                />
                <input 
                    id='password'
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password...'
                />
                <label htmlFor="login-buttons">Enter Credentials First</label>
            </div>
            <div className='button-container' id='login-buttons'>
                <button className='login-button' onClick={loginUser} type='submit'>Login</button>
                <button className='login-button' onClick={createUser} type='submit'>Create Account</button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    )
}