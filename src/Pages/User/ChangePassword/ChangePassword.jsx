import React, { useState } from "react";
import './ChangePassword.css';
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";
import ChangePasswords from '../../../Assets/ChangePassword.svg';


const ChangePassword  = () => {
   
    return(
        <div className="container">
            <TemplateProfile/>
            <SidebarProfile2/>
            <div className="foto-change-password"><img src={ChangePasswords} alt=""/></div>
            <div className="baris-change-password-1">
                <input type="text" className="form-control input-change-password-1" placeholder="Old Password" />
            </div>
            <div className="form-group baris-change-password-2">
                <input type="text" className="form-control input-change-password-2"  placeholder="New Password" />
            </div>
            <div className="form-group baris-change-password-3">
                <input type="text" className="form-control input-change-password-3"  placeholder="Confirmation Password" />
            </div>
            <button type="submit" className="button-batalkan-change-password">Batalkan</button>
            <button type="submit" className="button-simpan-change-password">Simpan</button>
        </div>
    )
}

export default ChangePassword