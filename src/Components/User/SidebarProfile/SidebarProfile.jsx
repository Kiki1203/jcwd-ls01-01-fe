import React, {useState, useEffect }  from "react";
import './SidebarProfile.css';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import default1 from '../../../Assets/default.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faUser, faReceipt, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
          console.log(res.data)
          if(res.data[0].nama) {setNama(res.data[0].nama)}
          if(res.data[0].profile_picture) {setProfilepic(res.data[0].profile_picture)}
      }).catch((err) => {
          console.log('ini err get',err)
      })
      }, [])

      const btnLogOut = () => {
        localStorage.removeItem('myTkn');
         navigate("/")
      }

    return(
        <div id="container-sb">
          <div className="d-md-block d-lg-block d-none">
              <div className='sidebar-profile-box'>
                <div className='box-baris-1'>
                    <div className='sidebar-pp-box'>
                    {
                        profilepic?
                        <img src={`${API_URL + '/'}${profilepic}`} id='userImgSide' />
                        :
                        <img  src={default1} alt='Image Preview' id='userImgSide' />
                    }
                    </div>
                    <div className='sidebar-name-box'>{nama}</div>
                </div>
                <div className="garis-profile"></div>
                  <Link to="/profile" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className='box-baris-2'>
                      <FontAwesomeIcon icon={faUser} id='sidebar-logo' />
                      <div className='sidebar-profile'>Profile</div>
                    </div>
                  </Link>
                  <Link to='/semuapesanan' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className='box-baris-3'>
                      <FontAwesomeIcon icon={faReceipt} id='sidebar-logo' />
                      <div className='sidebar-proses-pemesanan'>Proses Pemesanan</div>
                    </div>
                  </Link>
                 <div  style={{ color: "#213360" }}>
                 <div className='box-baris-4'>
                      <FontAwesomeIcon icon={faMoneyBills} id='sidebar-logo' />
                      <div className='sidebar-metode-pembayaran'>Metode Pembayaran</div>
                    </div>
                 </div>
                  <Link to='/alamatpengiriman' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className='box-baris-5'>
                      <FontAwesomeIcon icon={faLocationDot} id='sidebar-logo' />
                      <div className='sidebar-alamat-pengiriman'>Alamat Pengiriman</div>
                    </div>
                  </Link>
                  <Link to='/favorite' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className='box-baris-6'>
                      <FontAwesomeIcon icon={faHeart} id='sidebar-logo' />
                      <div className='sidebar-favorite'>Favorite</div>
                    </div>
                  </Link>
                  <div  style={{ color: "#213360" }}>
                    <div id='box-baris-7'>
                  <FontAwesomeIcon icon={faEnvelope} id='sidebar-logo' />
                    <div className='sidebar-pesan-bantuan'>Pesan Bantuan</div>
                  </div>
                  </div>
                
              </div>
          </div>

          <div className="d-lg-none d-md-none d-block">
          <div className="tab-mobile-profile">
            <Link  to='/editprofile' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
              <div className="button-edit-profile">
                <FontAwesomeIcon icon={faPenToSquare}  style={{marginLeft: "8px"}} />
                <div className="tulisan-edit-profile">Edit Profile</div>
              </div>
            </Link>
           <Link  to='/semuapesanan' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
            <div className="button-proses-pemesanan-profile">
                <FontAwesomeIcon icon={faReceipt}  style={{marginLeft: "25px"}} />
                <div className="tulisan-proses-profile">Proses Pemesanan</div>
              </div>
           </Link>
            <Link  to='/favorite' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
            <div className="button-favorite-profile">
              <FontAwesomeIcon icon={faHeart} className="logo-favorite" />
              <div className="tulisan-favorite-profile">Favorite</div>
            </div>
            </Link>
            <div className="tab-list">
                <div style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                <div className="tab-list-1" >
                  <FontAwesomeIcon icon={faMoneyBills} className="logo-metode-bayar" />
                  <div className="metode-pembayaran-profile">Metode Pembayaran</div>
                  <FontAwesomeIcon icon={faAngleRight} style={{marginLeft: "330px", fontSize: '12px'}} />
                </div>
                </div>
             <Link to='/alamatpengiriman' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
              <div className="tab-list-2">
                  <FontAwesomeIcon icon={faLocationDot} className="logo-alamat-kirim" />
                  <div className="alamat-pengiriman-profile">Alamat Pengiriman</div>
                  <FontAwesomeIcon icon={faAngleRight}  style={{marginLeft: "330px", fontSize: '12px'}}  />
                </div>
             </Link>
             <div className="tab-list-3"  style={{ color: "#213360" }}>
              <FontAwesomeIcon icon={faEnvelope} className="logo-pesan-bantuan" />
                <div className="pesan-bantuan-profile">Pesan Bantuan</div>
                <FontAwesomeIcon icon={faAngleRight}  style={{marginLeft: "330px", fontSize: '12px'}}  />
              </div>
              <div className="tab-list-4"  style={{ color: "#213360" }}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="logo-log-out" />
                <div className="log-out-profile" onClick={() => btnLogOut()}>Log Out</div>
                <FontAwesomeIcon icon={faAngleRight}  style={{marginLeft: "330px", fontSize: '12px'}}  />
              </div>
            </div>
          </div>

          </div>
        </div>
    )
}

export default SidebarProfile