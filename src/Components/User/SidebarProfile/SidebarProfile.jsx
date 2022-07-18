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
        <div>
          <div className="d-lg-none d-md-none d-block">
          <div className="wrapper">
            <div className="col-12">
            <div className="tab-mobile-profile">
            <div className="tab-mobile-profile-2">
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

            </div>
            <div className="tab-list">
                <div style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                <div className="tab-list-1" >
                  <FontAwesomeIcon icon={faMoneyBills} className="logo-metode-bayar" />
                  <span className="metode-pembayaran-profile">Metode Pembayaran</span>
                  <FontAwesomeIcon icon={faAngleRight} className="logo-2" />
                </div>
                </div>
             <Link to='/alamatpengiriman' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
              <div className="tab-list-2">
                  <FontAwesomeIcon icon={faLocationDot} className="logo-alamat-kirim" />
                  <span className="alamat-pengiriman-profile">Alamat Pengiriman</span>
                  <FontAwesomeIcon icon={faAngleRight}  className="logo-3"   />
                </div>
             </Link>
             <div className="tab-list-3"  style={{ color: "#213360" }}>
              <FontAwesomeIcon icon={faEnvelope} className="logo-pesan-bantuan" />
                <span className="pesan-bantuan-profile">Pesan Bantuan</span>
                <FontAwesomeIcon icon={faAngleRight}  className="logo-4"   />
              </div>
              <div className="tab-list-4"  style={{ color: "#213360" }}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="logo-log-out" />
                <span className="log-out-profile" onClick={() => btnLogOut()}>Log Out</span>
                <FontAwesomeIcon icon={faAngleRight} className="logo-5"   />
              </div>
            </div>
          </div>
            </div>
          </div>
          </div>
        </div>
    )
}

export default SidebarProfile