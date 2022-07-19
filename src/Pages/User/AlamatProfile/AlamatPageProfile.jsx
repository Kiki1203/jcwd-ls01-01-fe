import React, { useState } from "react";
import './AlamatPageProfile.css';
import SidebarProfile from "../../../Components/User/SidebarProfile/SidebarProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { faUser, faReceipt, faAngleLeft, faMoneyBills, faLocationDot, faHeart, faEnvelope, faPenToSquare, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';



const AlamatPage  = () => {    
    return(
        <div>
          <div className="container-ap">
            <div>
            <div className="wrapper-3">
            <div className="c-ap d-flex">
                <div className='col-lg-3 col-md-2 d-lg-block d-md-block d-none sidebar-ap-1'>
                    <SidebarProfile/>
                </div>
                <div  className='col-lg-1 col-none d-lg-block d-md-none d-none'>
                    
                </div>
                <div className='col-lg-8 col-md-9 col-12 sidebar-ap'>
                    <div className="box-alamat-lengkap">
                        <div className="d-lg-none d-md-none d-block d-flex mt-4">
                                    <div>
                                        <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </Link>
                                    </div>
                                    <div className="mx-4 keterangan-verifikasi-desk" >Alamat Pengiriman</div>
                                </div>
                                <div className="d-lg-block d-md-block d-none">
                                <div className="judul-alamat-pengiriman">Alamat Pengiriman</div>
                                </div>
                                <div className="garis-alamat"></div>
                                {/* CONTOH ALAMAT UTAMA DAN RUMAH */}
                                <div className="box-alamat-utama">
                                   <div>
                                   <div className='judul-page-alamat'>Alamat Utama</div>
                                    <div className="d-flex">
                                    <div className="foto-rumah"></div>
                                    <div className="box-informasi-alamat">
                                        <div className="nama-alamat-tujuan">Rumah Saya</div>
                                        <div className="alamat-lengkap-utama">Jl.Cokroaminoto no.78, Nganjuk, Jawa Timur</div>
                                    </div>
                                     <div className="button-edit-alamat">Edit</div>
                                    </div>
                                   
                                   </div>
                                </div>
                                <div className="d-flex">
                                <div className="button-tambah-alamat">Add New Address</div>
                                <div className="button-next-alamat">1</div>
                                </div>

                                
                            </div>
                </div>
            </div>
            </div> 
        </div>
        </div>
        </div>
    )
}

export default AlamatPage