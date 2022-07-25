import React, {useEffect }  from "react";
import './Profile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile.jsx";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import default1 from '../../../Assets/default.jpg';
import { faReceipt, faAngleLeft, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RingLoader } from "react-spinners";
import FooterMobile from "../../../Components/User/Footer/FooterMobile.jsx"

const Profile  = () => {
    const [loading, setLoading] = React.useState(false);
    const [verified, setVerified] = React.useState('')
    const [nama, setNama] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [umur, setUmur] = React.useState("");
    const [profilepic, setProfilepic] = React.useState("");
    const [token, setToken] = React.useState("");
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        let tokens = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${tokens}`,
            }
        }
        axios.get(`${API_URL}/user/datauser`, headers)
        .then((res) => {
            setLoading(false)
            setVerified(res.data[0].verified)
            setToken(res.data[0].token)
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
        }, [token, nama, email, gender, username, profilepic, umur])


const btnLogOut = () => {
    localStorage.removeItem('myTkn');
    navigate("/")
}
    
 const profilePage = () => {
    return(
        <div>
         <div className="container-tp">
            <div>
            <div className="wrapper">
            <div className="c">
                <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-new-profile-1'>
                    <SidebarProfile/>
                </div>
                <div  className='col-lg-1 col-md-1 col-none d-lg-block d-md-none d-none'>
                    
                </div>
                <div  className='col-lg-8 col-md-9 col-12 sidebar-profile'>
                <div className="d-lg-none d-md-none d-block d-flex navbar-pro">
                <div>
                    <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                        <FontAwesomeIcon icon={faAngleLeft} className="logo-1-p"/>
                    </Link>
                </div>
                <div className="keterangan-verifikasi-desk"  style={{marginTop: "35px", marginLeft: "30px"}}>Akun Terverifikasi</div>
            </div>
            <div className="d-lg-block d-md-block d-none">
            <div className="mx-4 mt-4 keterangan-verifikasi-desk">Akun Terverifikasi</div>
            </div>
                <div className=" mt-4 d-lg-block d-md-block d-none">
                   <div className="d-flex ">
                   <div className="tab-profile" onClick={() => navigate('/profile')}>Profile</div> 
                    <div className="tab-profile" onClick={() => navigate('/editprofile')}>Edit Profile</div>
                    <div className="tab-profile" onClick={() => navigate('/changepassword')}>Change Password</div>
                   </div>
                </div>
           <div  className="d-lg-block d-md-block d-none">
           <hr style={{marginTop:'0px'}}/>
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
                    <div className="d-lg-none d-md-block d-none">
                        <div className="" >
                            <div className="nama-profile">Email :</div>
                            <div className="nama-profile-2"><span className="tulisan-data-email">{email}</span></div>
                        </div>
                    </div>
                    <div className="d-lg-block d-md-none d-block" >
                    <div className="d-flex" >
                            <div className="nama-profile">Email :</div>
                            <div className="nama-profile-2"><span className="tulisan-data-email">{email}</span></div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
                
            <div className="d-lg-none d-md-none d-block">
            <div className="sidebars-mobile">
                <div className="">
                <div className="tab-mobile-profile">
                <div className="tab-mobile-profile-2">
                <Link  to='/editprofile' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                <div className="button-edit-profile" onClick={() => navigate('/editprofile')}>
                    <FontAwesomeIcon icon={faPenToSquare}  style={{marginLeft: "8px"}} />
                    <div className="tulisan-edit-profile">Edit Profile</div>
                </div>
                </Link>
                <Link  to='/semuapesanan' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className="button-proses-pemesanan-profile">
                        <FontAwesomeIcon icon={faReceipt}  style={{marginLeft: "25px"}} />
                        <div className="tulisan-proses-profile" onClick={() => navigate('/semuapesanan')}>Proses Pemesanan</div>
                    </div>
                </Link>
                <Link  to='/favorite' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                <div className="button-favorite-profile">
                <FontAwesomeIcon icon={faHeart} className="logo-favorite" />
                <div className="tulisan-favorite-profile">Favorite</div>
                </div>
                </Link>

                </div>
                <div className="tab-list">
                    <div style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className="tab-list-1" >
                    <FontAwesomeIcon icon={faMoneyBills} className="logo-metode-bayar" />
                    <span className="metode-pembayaran-profile">Metode Pembayaran</span>
                    <FontAwesomeIcon icon={faAngleRight} className="logo-2" />
                    </div>
                    </div>
                 <div className="tab-list-2" style={{ color: "#213360" }}  onClick={() => navigate('/alamatpengiriman')}>
                    <FontAwesomeIcon icon={faLocationDot} className="logo-alamat-kirim" />
                    <span className="alamat-pengiriman-profile">Alamat Pengiriman</span>
                    <FontAwesomeIcon icon={faAngleRight}  className="logo-3"   />
                    </div>
                <div className="tab-list-3"  style={{ color: "#213360" }}>
                <FontAwesomeIcon icon={faEnvelope} className="logo-pesan-bantuan" />
                    <span className="pesan-bantuan-profile">Pesan Bantuan</span>
                    <FontAwesomeIcon icon={faAngleRight}  className="logo-4"   />
                </div>
                <div className="tab-list-4"  style={{ color: "#213360" }}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="logo-log-out" />
                    <span className="log-out-profile" onClick={() => btnLogOut()} >Log Out</span>
                    <FontAwesomeIcon icon={faAngleRight} className="logo-5"   />
                </div>
                
                </div>
                
            </div>
            
            
                </div>
              
                
            </div>
               
            </div>
            
            <div>
            
            <div>
           
            </div>
            
            </div>
            
                </div>
             <FooterMobile/>
            </div>
           
            </div> 
            
        </div>
        
        </div>
        
        </div>
    )
 }
    

    if(localStorage.getItem('myTkn')){
        if(verified === 0){
          return(
            <Navigate to='/verification' />
          )
        }else{
          return(
            <>{profilePage()}</>
          )
        }
      }else{
        if(localStorage.getItem('token') === token){
          if(verified === 0){
            return(
              <Navigate to='/verification' />
            )
          }else{
            return(
              <>{profilePage()}</>
            )  
          }
        }else{
          return(
            <Navigate to='/' />
          ) 
        }
      }
   
}


  
  export default Profile