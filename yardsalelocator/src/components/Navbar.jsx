import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


export class MyNavbar extends Component {
    
    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                            <Navbar bg="light" variant="light" expand="lg" sticky="top">
                                <Navbar.Brand id="navLogo" href="/">Yard Sale Locator</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    
                                <div> {localStorage.getItem('userToken') === null ?
                    
                    <Nav className="mr-auto">
                            <Link to='/' className='nav-links'>Home</Link>
                        
                            <Link to='/login' className='nav-links'>Log In</Link>
                      
                            <Link to='/register' className='nav-links'>Sign Up</Link>
                            </Nav>
                   :
                   <Nav className="mr-auto">
                            <Link to='/' className='nav-links'>Home</Link>
                            <Link to='/post' className='nav-links'>Posts</Link>
                            <Link to='/profile' className='nav-links'>Profile</Link>
                            <Link to='/signout' className='nav-links'>Sign Out</Link>
                            </Nav>
                }</div>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                    </div>
                </div>
            </div>
        )  
    };
}
export default MyNavbar

// return (
    //     <nav className="navbar">
    //         <div className="navbar-container">
    //             <Link to="/" className="navbar-logo">Yard Sale Locator</Link>
                // <div> {localStorage.getItem('userToken') === null ?
                //     <ul className='nav-menu'>
                //         <li className='nav-item'>
                //             <Link to='/' className='nav-links'>Home</Link>
                //         </li>
                //         <li className='nav-item'>
                //             <Link to='/login' className='nav-links'>Log In</Link>
                //         </li>
                //         <li className='nav-item'>
                //             <Link to='/register' className='nav-links'>Sign Up</Link>
                //         </li>
                //     </ul> :
                //     <ul className='nav-menu'>
                //         <li className='nav-item'>
                //             <Link to='/' className='nav-links'>Home</Link>
                //         </li>
                //         <li className='nav-item'>
                //             <Link to='/post' className='nav-links'>Posts</Link>
                //         </li>
                //         <li className='nav-item'>
                //             <Link to='/profile' className='nav-links'>Profile</Link>
                //         </li>
                //         <li className='nav-item'>
                //             <Link to='/signout' className='nav-links'>Sign Out</Link>
                //         </li>
                //     </ul>
                // }</div>
    //         </div>
    //     </nav>

    // )