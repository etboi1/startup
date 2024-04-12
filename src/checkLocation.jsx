import React from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import './styles.css'

export function CheckLocation() {
    const location = useLocation();

    if (location.pathname === '/goals') {
        return (
            <span>
                <NavLink to='/add'>Add Goal</NavLink>
            </span>
        )
    }
    else if (location.pathname === '/share') {
        return (
            <span>
                <NavLink to='/send'>Share Goal</NavLink>
            </span>
        )
    }
}