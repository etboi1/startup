import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation} from 'react-router-dom';
import { Login } from './login/login';
import { Goals } from './goals/goals';
import { Share } from './sharePage/sharedgoals';
import { AuthState} from './login/authState';
import { NewGoal} from './add/addGoal';
import { ShareGoal } from './send/send';
import { CheckLocation } from './checkLocation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
    const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className='body'>
                {authState === AuthState.Unauthenticated && (
                    <header className="header">
                        <h1>Welcome to REACH! Goals</h1>
                    </header>
                )}
                {authState === AuthState.Authenticated && (
                <header className="header">
                    <nav className="nav">
                        <h2 className="navtitle">
                            REACH!
                        </h2>
                        <h3 className="navitem">
                            <NavLink to=''>Home</NavLink>
                        </h3>
                        <h3 className="navitem">
                            <NavLink to='goals'>Personal Goals</NavLink>
                        </h3>
                        <h3 className="navitem">
                            <NavLink to='share'>Shared Goals</NavLink>
                        </h3>
                        {/* <h3 class="navitem">
                            <NavLink to='/simon'>Simon</NavLink>
                        </h3> */}
                        <h6 className="username">Welcome {username}!</h6>
                    </nav>
                </header>
                )}

                <Routes>
                    <Route path='/' element={
                        <Login
                        username={username}
                        authState={authState}
                        onAuthChange={(username, authState) => {
                            setAuthState(authState);
                            setUsername(username);
                        }}
                        />
                    } />
                    <Route path='/goals' element={<Goals />} />
                    <Route path='/share' element={<Share />} />
                    <Route path='/add' element={<NewGoal />} />
                    <Route path='/send' element={<ShareGoal />} />
                    {/* <Route path='/progress' element={<UpdateGoal />} /> */}
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    {/* <CheckLocation /> */}
                    <span>Ethan Grundvig</span>
                    <a href="https://github.com/etboi1/startup">GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;