import React, { useState } from "react";
import './TemplateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const TemplateProfile  = () => {    
    return(
        <div id="container-tp">
            <div className="box-profile">
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