import React from 'react';

import './login.jsx';

export function Authenticated(props) {
    function logout() {
        fetch(`/api/auth/logout`, {
            method: `delete`,
        })
        .catch(() => {
            // logout failed. Assuming offline
        })
        .finally(() => {
            localStorage.removeItem('username');
            props.onLogout();
            Reroute('/');
        })
    }

    return (
        <div className='form'>
            <button className='login-button' type='submit' onClick={logout}>Logout</button>
        </div>
    )
}