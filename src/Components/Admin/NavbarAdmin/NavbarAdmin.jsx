import React, { useState } from "react";
import './NavbarAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const NavbarAdmin  = () => {
    return(
        <div className="container">
            <div className="navbar-box-admin">
                <div className="logo-notif-navbar-admin"><FontAwesomeIcon icon={faBell} className="" /></div>
                <div className="logo-profile-navbar-admin"><FontAwesomeIcon icon={faUser} className="" /></div>
            </div>  
        </div>
    )
}

export default NavbarAdmin