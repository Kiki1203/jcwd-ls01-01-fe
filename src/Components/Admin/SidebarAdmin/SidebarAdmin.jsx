import React, { useState } from "react";
import './SidebarAdmin.css';
import LogoFull from '../../../Assets/LogoFull.svg';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPills, faReceipt, faAngleDown, faAngleUp, faChartLine } from '@fortawesome/free-solid-svg-icons';

const SidebarAdmin  = () => {
    return(
        <div className="container">
            <NavbarAdmin/>
            <div className="box-sidebar-admin">
                <div className="logo-navbar-admin-box">
                    <div className="logo-navbar-admin-inside-box">
                        <div className="gambar-logo-navbar-admin"><img src={LogoFull} alt=""/></div>
                        <div className="nama-logo-navbar-admin">Apotakecare</div>
                    </div>
                </div>
                <div className="box-dashboard-sidebar-admin">
                    <div className="inside-box-dashboard-sidebar-admin">
                    <div className="logo-home-sidebar-admin"><FontAwesomeIcon icon={faHouse} className="" /></div>
                    <div className="tulisan-sidebar-admin-1">Dashboard</div>
                    </div>
                </div>
                <div className="box-produk-sidebar-admin">
                    <div className="inside-box-produk-sidebar-admin">
                    <div className="logo-produk-sidebar-admin"><FontAwesomeIcon icon={faPills} className="" /></div>
                    <div className="tulisan-sidebar-admin-2">Produk</div>
                    </div>
                    <div className="logo-bawah-admin"><FontAwesomeIcon icon={faAngleDown} className="" /></div>
                </div>
                <div className="box-transaksi-sidebar-admin">
                    <div className="inside-box-transaksi-sidebar-admin">
                    <div className="logo-transaksi-sidebar-admin"><FontAwesomeIcon icon={faReceipt} className="" /></div>
                    <div className="tulisan-sidebar-admin-3">Transaksi</div>
                    </div>
                    <div className="logo-bawah-admin"><FontAwesomeIcon icon={faAngleDown} className="" /></div>
                </div>
                <div className="box-revenue-sidebar-admin">
                    <div className="inside-box-revenue-sidebar-admin">
                    <div className="logo-revenue-sidebar-admin"><FontAwesomeIcon icon={faChartLine} className="" /></div>
                    <div className="tulisan-sidebar-admin-4">Sales & Revenue</div>
                    </div>
                    <div className="logo-bawah-admin"><FontAwesomeIcon icon={faAngleDown} className="" /></div>
                </div>
             </div>
        </div>
    )
}

export default SidebarAdmin