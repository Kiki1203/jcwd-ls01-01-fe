import React, { useState } from "react";
import './AlamatPageProfile.css';
import SidebarProfile2 from "../../../Components/User/SidebarProfile/SidebarProfile2.jsx";


const AlamatPage  = () => {    
    return(
        <div className="container-alamat-pengiriman">
            <SidebarProfile2/>
            <div className="box-alamat-lengkap">
                <div className="d-lg-none d-md-none d-block"><span className="material-icons pinggiran-atas-alamat">chevron_left</span></div>
                <div className="judul-alamat-pengiriman">Alamat Pengiriman</div>
                <div className="garis-alamat"></div>
                {/* CONTOH ALAMAT UTAMA DAN RUMAH */}
                <div className="box-alamat-utama">
                    <div className='judul-page-alamat'>Alamat Utama</div>
                    <div className="foto-rumah"></div>
                    <div className="box-informasi-alamat">
                        <div className="nama-alamat-tujuan">Rumah Saya</div>
                        <div className="alamat-lengkap-utama">Jl.Cokroaminoto no.78, Nganjuk, Jawa Timur</div>
                    </div>
                    <div className="button-edit-alamat">Edit</div>
                </div>
                <div className="button-tambah-alamat">Add New Address</div>
                <div className="button-next-alamat">1</div>

                {/* CONTOH ALAMAT KEDUA DAN KANTOR */}
                <div className="box-alamat-selanjutnya">
                    <div className="foto-kantor"></div>
                    <div className="box-informasi-alamat">
                        <div className="nama-alamat-tujuan">Kantor</div>
                        <div className="alamat-lengkap-utama">Jl.Garuda Pancasila no.45, Surabaya, Jawa Timur</div>
                    </div>
                    <div className="button-edit-alamat">Edit</div>
                </div>
            </div>
        </div>
    )
}

export default AlamatPage