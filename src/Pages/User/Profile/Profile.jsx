import React, {useState, useEffect }  from "react";
import './Profile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import TemplateProfile from "../../../Components/User/TemplateProfile/TemplateProfile.jsx";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import default1 from '../../../Assets/default.jpg';
import { faUser, faReceipt, faAngleLeft, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Profile  = () => {
    const [loading, setLoading] = React.useState(false);
    const [verified, setVerified] = React.useState('')
    const [nama, setNama] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [umur, setUmur] = React.useState("");
    const [profilepic, setProfilepic] = React.useState("");

    useEffect(() => {
        setLoading(true)
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/datauser`, headers)
        .then((res) => {
            setLoading(false)
            setVerified(res.data[0].verified)
            console.log(res.data)
            if(res.data[0].nama) {setNama(res.data[0].nama)}
            if(res.data[0].email) {setEmail(res.data[0].email)}
            if(res.data[0].gender) {setGender(res.data[0].gender)}
            if(res.data[0].username) {setUsername(res.data[0].username)}
            if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
            if(res.data[0].umur) {setUmur(res.data[0].umur)}
        }).catch((err) => {
            console.log('ini err get',err)
            setLoading(false)
        })
        }, [])
    
    if(verified === 0){
        return(
            <Navigate to='/verification' />
        )   
    }else if( !localStorage.getItem('myTkn')){
        return(
            <Navigate to='/' />
        )
    }else if(localStorage.getItem('token')){
        return(
            <Navigate to='/homeadmin' />
        )
    }else{
        return(
            <div>
               <TemplateProfile />
               <SidebarProfile />
               <div className="container-profile">
               <div className="d-lg-none d-md-none d-block d-flex mt-4">
                    <div>
                        <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </Link>
                    </div>
                    <div className="mx-4 keterangan-verifikasi-desk" >Akun Terverifikasi</div>
                </div>
                <div className="d-lg-block d-md-block d-none">
                <div className="mx-4 mt-4 keterangan-verifikasi-desk">Akun Terverifikasi</div>
                </div>
                    <div className=" mt-4 d-lg-block d-md-block d-none">
                       <div className="d-flex ">
                       <div className="mx-3 tab-profile">Profile</div> 
                        <div className="mx-3 tab-profile">Edit Profile</div>
                        <div className="mx-3 tab-profile">Change Password</div>
                       </div>
                    </div>
               <div  className="d-lg-block d-md-block d-none">
               <hr style={{marginTop:'-3px'}}/>
               </div>
                <div className="container-inside">
                    <div className="foto-profile"> 
                        {
                            profilepic?
                            <img src={`${API_URL + '/'}${profilepic}`} id='userImgSet' />
                            :
                            <img  src={default1} alt='Image Preview' id='userImgSet' />
                        }
                    </div>
                    <div className="box-data-diri">
                        <div className="personal-data">Personal Data</div>
                        <div className="d-flex"> 
                            <div className="nama-profile">Nama :</div>
                            <div className="nama-profile-2">
                                {
                                    nama ?
                                    <>{nama}</>
                                    :
                                    <><div>-</div></>
                                }
                            </div>
                        </div>
                        <div className="d-flex ">
                            <div className="nama-profile">Username:</div>
                            <div className="nama-profile-2">{username}</div>
                        </div>
                        <div className="d-lg-none d-md-block d-none">
                            <div className="" >
                                <div className="nama-profile">Email :</div>
                                <div className="nama-profile-2"><span className="tulisan-data-email">{email}</span></div>
                            </div>
                        </div>
                        <div className="d-flex d-lg-block d-md-none d-block" >
                        <div className="d-flex" >
                                <div className="nama-profile">Email :</div>
                                <div className="nama-profile-2"><span className="tulisan-data-email">{email}</span></div>
                            </div>
                        </div>
                        <div className="d-flex ">
                            <div className="nama-profile">Gender :</div>
                            <div className="nama-profile-2">
                                {
                                    gender ?
                                    <>{gender}</>
                                    :
                                    <><div>-</div></>
                                }
                            </div>
                        </div>
                        <div className="d-flex ">
                            <div className="nama-profile">Usia :</div>
                            <div className="nama-profile-2">
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
                </div>
            </div>
        )
    }
    

   
}


  
  export default Profile