import React, { useState } from "react";
import './SidebarProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUser, faReceipt, faMoneyBills, faLocationDot, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SidebarProfile2  = () => {
    return(
        <div className="container">
          <div className="d-md-block d-lg-block d-none">
              <div className='sidebar-profile-box'>
                <div className='box-baris-1'>
                    <div className='sidebar-pp-box'></div>
                    <div className='sidebar-name-box'>Jane Done</div>
                </div>
                <div className="garis-profile"></div>
                  <Link to="/profile" style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className='box-baris-2'>
                      <FontAwesomeIcon icon={faUser} id='sidebar-logo' />
                      <div className='sidebar-profile'>Profile</div>
                    </div>
                  </Link>
                  <Link to='/' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className='box-baris-3'>
                      <FontAwesomeIcon icon={faReceipt} id='sidebar-logo' />
                      <div className='sidebar-proses-pemesanan'>Proses Pemesanan</div>
                    </div>
                  </Link>
                  <Link to='/' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                    <div className='box-baris-4'>
                      <FontAwesomeIcon icon={faMoneyBills} id='sidebar-logo' />
                      <div className='sidebar-metode-pembayaran'>Metode Pembayaran</div>
                    </div>
                  </Link>
                  <Link to='/' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className='box-baris-5'>
                      <FontAwesomeIcon icon={faLocationDot} id='sidebar-logo' />
                      <div className='sidebar-alamat-pengiriman'>Alamat Pengiriman</div>
                    </div>
                  </Link>
                  <Link to='/' style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
                  <div className='box-baris-6'>
                      <FontAwesomeIcon icon={faHeart} id='sidebar-logo' />
                      <div className='sidebar-favorite'>Favorite</div>
                    </div>
                  </Link>
                  <div style={{ color: "#213360" }}>
                    <div id='box-baris-7'>
                      <FontAwesomeIcon icon={faEnvelope} id='sidebar-logo' />
                    <div className='sidebar-pesan-bantuan'>Pesan Bantuan</div>
                  </div>
                  </div>
                  
               
              </div>
          </div>
        </div>
    )
}

export default SidebarProfile2