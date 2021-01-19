import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <>
         <nav className="navbar">
             <div className="navbar-container">
                 <Link to="/" className="navbar-logo">
                     Yard Sale Locator 
                 </Link>
                 <ul className='nav-menu'>
                     <li className='nav-item'>
                         <Link to='/' className='nav-links'>
                             Home
                         </Link>
                     </li>
                     <li className='nav-item'>
                         <Link to='/login' className='nav-links'>
                             Log In
                         </Link>
                     </li>
                     <li className='nav-item'>
                         <Link to='/signup' className='nav-links'>
                             Sign Up
                         </Link>
                     </li>
                 </ul>
             </div>
         </nav>

        </>
    )
}

export default Navbar
