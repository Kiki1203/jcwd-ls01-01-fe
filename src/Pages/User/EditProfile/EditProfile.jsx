import React, { useState } from "react";
import './EditProfile.css';
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";


const EditProfile  = () => {
   
    return(
        <div className="container">
            <TemplateProfile/>
            <SidebarProfile2/>
            <div className="edit-foto-profile"></div>
            <div className="button-edit-foto">Edit Foto</div>
            <div className="baris-edit-profile-1">
                <input type="text" className="form-control input-edit-profile-1" placeholder="Name" />
            </div>
            <div className="form-group baris-edit-profile-2">
                <input type="text" className="form-control input-edit-profile-2"  placeholder="Email Address" />
            </div>
            <div className="form-group baris-edit-profile-3">
                <input type="text" className="form-control input-edit-profile-3"  placeholder="Jenis Kelamin" />
            </div>
            <div className="form-group baris-edit-profile-4">
                <input type="text" className="form-control input-edit-profile-4"  placeholder="Usia" />
            </div>
            <div className="d-lg-none d-md-none d-block" id="wanna-change-password">Wanna change password? <span>click here</span></div>
            <button type="submit" className="button-batalkan-edit-profile">Batalkan</button>
            <button type="submit" className="button-simpan-edit-profile">Simpan</button>
        </div>
    )
}

export default EditProfile