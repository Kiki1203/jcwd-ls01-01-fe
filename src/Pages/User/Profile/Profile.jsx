import React, { useState } from "react";
import './Profile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";
import { Link } from 'react-router-dom';


const Profile  = () => {
   
    return(
        <div className="container">
            <TemplateProfile/>
            <SidebarProfile/>
                <div className="box-inside-profile-info">
                    <div className="foto-profile"></div>
                    <div className="personal-data">Personal Data</div>
                    <div className="d-lg-none d-md-none d-block">
                        <div className="d-flex">
                        <div className="full-name-profile">Amber Hania</div>
                        <div className="isi-usia-profile-mobile">(25)</div>
                        </div>
                    </div>
                    <div className="bungkus-info-profile">
                        <div className="nama-profile">Nama :</div>
                        <div className="full-name-profile">Amber Hania</div>
                        <div className="nomer-profile">No.Hp :</div>
                        <div className="nominal-nomor-profile">+1332 288 69 208</div>
                        <div className="email-profile">Email :</div>
                        <div className="isi-email-profile">hania@gmail.com</div>
                        <div className="gender-profile">Gender :</div>
                        <div className="isi-gender-profile">Female</div>
                        <div className="usia-profile">Usia :</div>
                        <div className="isi-usia-profile">25 tahun</div>
                    </div>
                </div>
        </div>
    )
}

export default Profile