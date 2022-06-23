import React, { useState } from "react";
import './TemplateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const TemplateProfile  = () => {    
    return(
        <div className="container">
            <div className="box-profile">
                <div className="d-lg-none d-md-none d-block"><FontAwesomeIcon icon={faAnglesLeft} lassName="pinggiran-atas" /></div>
                <div className="keterangan-verifikasi">Akun Terverifikasi</div>
                <div className="tab-versi-dekstop">
                    <Link to="/profile">
                    <div className="tab-profile">Profile</div>
                    </Link>
                    <Link to="/editprofile">
                    <div className="tab-edit-profile">Edit Profile</div>
                    </Link>
                    <Link to="/changepassword">
                    <div className="tab-change-password">Change Password</div>
                    </Link>
                    <div className="garis-batas-tab-profile"></div>
                </div>
            </div>
        </div>
    )
}

export default TemplateProfile