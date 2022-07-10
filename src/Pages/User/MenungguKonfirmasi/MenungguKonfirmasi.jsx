import React, { useState } from "react";
import Chat from '../../../Assets/CHAT.svg';
import './MenungguKonfirmasi.css';


const MenungguKonfirmasi  = () => {
    return(
        <div className="container-menunggu-konfirmasi">
                <div className="d-lg-none d-md-none d-block">
                    <div className="box-judul-menunggu-konfirmasi">
                        <span className="material-icons pinggiran-atas-menunggu-konfirmasi">chevron_left</span>
                        <div className="judul-menunggu-konfirmasi">Menunggu Konfirmasi</div>
                    </div>
                </div>
                <div className="judul-menunggu-konfirmasi">Menunggu Konfirmasi</div>
                <div className="box-menunggu-konfirmasi">
                    <div className="detail-resep-judul">Detail Resep</div>
                    <div className="garis-dalam-detail-resep"></div>
                    <div className="gambar-resep-obat"></div>
                    <div className="box-nomor-resep-1">
                        <div className="tulisan-nomor-resep">Nomor Resep</div>
                        <div className="tulisan-isi-nomor-resep">#123abc567efg</div>
                        <div className="tulisan-tanggal-pengajuan">Tanggal Pengajuan:</div>
                        <div className="tulisan-isi-tanggal">Jumat, 5 April 2022, 15:45</div>
                    </div>
                    <div className="tulisan-perbesar-gambar">Perbesar Gambar</div>
                    <div className='tulisan-menunggu-balasan'>Mohon menunggu balasan dari apoteker selama 5 menit</div>
                    <div className='timer-logo-menunggu-konfirmasi'>Timer</div>
                    <div className="garis-dalam-detail-resep-2"></div>
                    <div className="box-batalkan-pengajuan d-flex">
                        <div className="tulisan-batalkan-pengajuan">Batalkan Pengajuan</div>
                        <div className="garis-dalam-detail-resep-3"></div>
                        <div className="chat-logo-menunggu-konfirmasi"><img src={Chat} alt="" width="24px" height="24px"/></div>
                        <div className='chat-cs-menunggu-konfirmasi'>Chat Customer Service</div>
                    </div>
                </div>
                <div className="button-back-home-menunggu-konfirmasi">Kembali Ke Beranda</div>
                <div className="button-check-status-menunggu-konfirmasi">Check Status Pembayaran</div>
        </div>
        
    )
}

export default MenungguKonfirmasi