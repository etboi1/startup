import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

import './login.css';

export function Login({ username, authState}) {
    return (
        <main>
            {authState != AuthState.Unknown && 
                <img className="dwayne" src="https://m.media-amazon.com/images/I/51UaQQbtyoL._AC_UF894,1000_QL80_.jpg" alt="Dwayne &quot;The Rock&quot; Johnson Inspirational Quote"></img>
            }
            {authState === AuthState.Authenticated && (
                <Authenticated username={username} onLogout={() => onAuthChange(username, AuthState.Unauthenticated)} />
            )}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    username={username}
                    onLogin={(loginUsername) => {
                        onAuthChange(loginUsername, AuthState.Authenticated);
                    }}
                />
            )}
        </main>
    )
}