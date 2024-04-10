import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Goals } from './goals/goals';
import { Share } from './sharePage/sharedgoals';
import { AuthState} from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div>
                {authState === AuthState.Authenticated && (
                <header className="header">
                    <nav className="nav">
                        <h2 className="navtitle">
                            REACH!
                        </h2>
                        <h3 className="navitem">
                            <NavLink to='goals'>Personal Goals</NavLink>
                        </h3>
                        <h3 className="navitem">
                            <NavLink to='share'>Shared Goals</NavLink>
                        </h3>
                        {/* <h3 class="navitem">
                            <NavLink to='/simon'>Simon</NavLink>
                        </h3> */}
                        <h8 className="username"></h8>
                    </nav>
                </header>
                )}

                {authState === AuthState.Authenticated && (
                    <Routes>
                        <Route path='/goals' element={<Goals />} />
                        <Route path='/share' element={<Share />} />
                        {/* <Route path='/simon' element={<Redirect to='https://simon.reachgoals.click/' />} /> */}
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                )}

                <footer>
                    <span>Ethan Grundvig</span>
                    <a href="https://github.com/etboi1/startup">GitHub</a>
                    {authState === AuthState.Authenticated && (
                        <button className='button' onClick="Logout()">Logout</button>
                    )}
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;