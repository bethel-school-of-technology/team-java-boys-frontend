import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

//Navbar is set to return one format if user is logged in, and another if user is not logged in. ~Ray
//NEED boolean from authentication page to set user status, below on line 8 is a manual set for now. ~Ray

const userAuth=false;

function Navbar() {
    if(userAuth) {
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
} else {
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
                        <Link to='/posts' className='nav-links'>
                            Posts
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/profile' className='nav-links'>
                            Profile
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/signout' className='nav-links'>
                            Sign Out
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

       </>
    )
}
};

export default Navbar
