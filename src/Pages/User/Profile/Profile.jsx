import React, {useState, useEffect }  from "react";
import './Profile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";
import axios from 'axios';
// import {connect} from 'react-redux';
// import { onUserLogin, onCheckUserLogin } from '../../../Redux/Actions/userAction';
import API_URL  from '../../../Helpers/API_URL.js';
import default1 from '../../../Assets/default.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Profile  = () => {
    

    const [nama, setNama] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [umur, setUmur] = React.useState("");
    const [profilepic, setProfilepic] = React.useState("");

    // useEffect(() => {
    //     onCheckUserLogin()
    //  }, [])

    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/datauser`, headers)
        .then((res) => {
            console.log(res.data)
            if(res.data[0].nama) {setNama(res.data[0].nama)}
            if(res.data[0].email) {setEmail(res.data[0].email)}
            if(res.data[0].gender) {setGender(res.data[0].gender)}
            if(res.data[0].username) {setUsername(res.data[0].username)}
            if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
            if(res.data[0].umur) {setUmur(res.data[0].umur)}
        }).catch((err) => {
            console.log('ini err get',err)
        })
        }, [])
    
    if(!localStorage.getItem('myTkn')){
            return(
                <Navigate to='/' />
            )
    }
    return(
        <div className="container">
            <TemplateProfile/>
            <SidebarProfile/>
            <div className="d-lg-block d-md-block d-none">
            <div className="keterangan-verifikasi-desk">Akun Terverifikasi</div>
            </div>
                <div className="box-inside-profile-info">
                     <div className="d-lg-none d-md-none d-block">
                        <div>
                            <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faAngleLeft} id="pinggiran-atas-profile-2" />
                            </Link>
                        </div>
                        <div className="keterangan-verifikasi">Akun Terverifikasi</div>
                    </div>
                    <div className="foto-profile"> 
                    {
                        profilepic?
                        <img src={`${API_URL + '/'}${profilepic}`} id='userImgSet' />
                        :
                        <img  src={default1} alt='Image Preview' id='userImgSet' />
                    }
                   </div>
                    <div className="personal-data">Personal Data</div>
                    <div className="d-lg-none d-md-none d-block">
                        <div className="box-mobile-pd">
                            <div className="full-name-profile-mobile"> 
                                {
                                    nama ?
                                    <>{nama}</>
                                    :
                                    <><div className="full-name-profile-mobile-none">-</div></>
                                }
                            </div>
                            <div className="isi-usia-profile-mobile">
                            {
                                umur ?
                                <>({umur})</>
                                :
                                <><div>(-)</div></>
                            }    

                            </div>
                        </div>
                    </div>
                    <div className="bungkus-info-profile">
                        <div className="nama-profile">Nama :</div>
                        <div className="full-name-profile">
                            {
                                nama ?
                                <>{nama}</>
                                :
                                <><div>-</div></>
                            }
                        </div>
                        <div className="nomer-profile">Username:</div>
                        <div className="nominal-nomor-profile">{username}</div>
                        <div className="email-profile">Email :</div>
                        <div className="isi-email-profile"><span className="tulisan-data-email">{email}</span></div>
                        <div className="gender-profile">Gender :</div>
                        <div className="isi-gender-profile">
                            {
                                gender ?
                                <>{gender}</>
                                :
                                <><div>-</div></>
                            }
                        </div>
                        <div className="usia-profile">Usia :</div>
                        <div className="isi-usia-profile">
                            {
                                umur ?
                                <>{umur} tahun</>
                                :
                                <><div>-</div></>
                            }    
                        </div>
                    </div>
                </div>
        </div>
    )
}


  
  export default Profile