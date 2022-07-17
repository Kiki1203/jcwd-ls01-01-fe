import React, { useState } from "react";
import './NavbarAdmin.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavbarAdmin  = () => {

    const navigate = useNavigate()
    
    const btnLogOut = () => {
        localStorage.removeItem('token');
        navigate("/loginadmin")
      }

    return(
        <div className="container">
            <div className="navbar-box-admin">
                <div className="logo-notif-navbar-admin"><FontAwesomeIcon icon={faBell} className="" /></div>
                <div className="logo-profile-navbar-admin" onClick={() => btnLogOut()}><FontAwesomeIcon icon={faArrowRightFromBracket} className="" /></div>
            </div>  
        </div>
    )
}

export default NavbarAdmin