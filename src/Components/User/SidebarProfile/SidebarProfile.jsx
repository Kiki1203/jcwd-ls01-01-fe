import React, { useState, useEffect } from "react";
import './SidebarProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import default1 from '../../../Assets/default.jpg';
import { faUser, faReceipt, faMoneyBills, faLocationDot, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';

const SidebarProfile  = () => {  
    const [nama, setNama] = React.useState("");
  const [profilepic, setProfilepic] = React.useState("");
  const navigate = useNavigate()

  useEffect(() => {
      let token = localStorage.getItem('myTkn')
      const headers = {
          headers: { 
              'Authorization': `${token}`,
          }
      }
      axios.get(`${API_URL}/user/datauser`, headers)
      .then((res) => {
          if(res.data[0].nama) {setNama(res.data[0].nama)}
          if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
      }).catch((err) => {
          console.log('ini err get',err)
      })
      }, [])


    return(
    <div className="container-newsidebar">
        <br/>
        <div className="mt-4 d-flex sidebar-box-1"> 
            <div className="sidebar-pp-box">
                {
                    profilepic ?
                    <> <img src={`${API_URL + '/'}${profilepic}`} alt='Image Preview' id='userImgSide' /></>
                    :
                    <img  src={default1} alt='Image Preview' id='userImgSide' />
                }
              
            </div>
            <div className='sidebar-name-box mt-2 mx-3'>{nama}</div>
        </div>
        <br/>
        <div  className='d-lg-block d-md-none d-none'>
        <hr/>
        </div>
        <br/>
        <div className="d-flex sidebar-box-1" onClick={() => navigate('/profile')}  >
            <FontAwesomeIcon icon={faUser} />
            <div className='sidebar-name-box' style={{marginBottom: "3px", marginLeft: "30px"}}>Profile</div>
        </div>
        <br/>
        <br/>
        <div className="d-flex sidebar-box-1" onClick={() => navigate('/semuapesanan')}  >
            <FontAwesomeIcon icon={faReceipt} />
            <div className='sidebar-name-box' style={{marginBottom: "3px", marginLeft: "30px"}}>Proses Pemesanan</div>
        </div>
        <br/>
        <br/>
        <div className="d-flex sidebar-box-1">
            <FontAwesomeIcon icon={faMoneyBills} />
            <div className='sidebar-name-box' style={{marginBottom: "5px", marginLeft: "20px"}}> Metode Pembayaran</div>
        </div>
        <br/>
        <br/>
        <div className="d-flex sidebar-box-1"  onClick={() => navigate('/alamatpengiriman')}  >
            <FontAwesomeIcon icon={faLocationDot} />
            <div className='sidebar-name-box' style={{marginBottom: "3px", marginLeft: "30px"}}> Alamat Pengiriman</div>
        </div>
        <br/>
        <br/>
        <div className="d-flex sidebar-box-1">
            <FontAwesomeIcon icon={faHeart} />
            <div className='sidebar-name-box' style={{marginBottom: "5px", marginLeft: "30px"}}> Favorite</div>
        </div>
        <br/>
        <br/>
        <div className="d-flex sidebar-box-1">
            <FontAwesomeIcon icon={faEnvelope} />
            <div className='sidebar-name-box' style={{marginBottom: "5px", marginLeft: "30px"}}>Pesan Bantuan</div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
     </div>
    )
}

export default SidebarProfile