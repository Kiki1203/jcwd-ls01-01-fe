import React, { useState } from "react";
import './TemplateProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const TemplateProfile2  = () => {    
    return(
        <div id="container-tp">
            <div className="box-profile">
                <div className="tab-versi-dekstop-2">
                    <Link to="/semuapesanan">
                    <div className="tab-change-password-1">Proses Pemesanan</div>
                    </Link>
                    <Link to="/editprofile">
                    <div className="tab-change-password-2">Edit Profile</div>
                    </Link>
                    <div className="tab-change-password-3">Metode Pembayaran</div>
                    <Link to="/alamatpengiriman">
                    <div className="tab-change-password-4">Alamat Pengiriman</div>
                    </Link>
                    <div className="tab-change-password-5">Favorite</div>
                    <div className="tab-change-password-6">Pesan Bantuan</div>
                    <div className="garis-batas-tab-profile-2"></div>
                </div>
            </div>
        </div>
    )
}

export default TemplateProfile2