import React, { useState } from "react";
import './NavbarAdmin.css';

const NavbarAdmin  = () => {
    return(
        <div className="container">
            <div className="navbar-box-admin">
                <div className="logo-notif-navbar-admin"><span className="material-icons">notifications</span></div>
                <div className="logo-profile-navbar-admin"><span className="material-icons">account_circle</span></div>
            </div>  
        </div>
    )
}

export default NavbarAdmin