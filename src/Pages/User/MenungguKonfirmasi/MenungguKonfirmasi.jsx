import axios from 'axios';
import React, { useState, useEffect } from "react";
import API_URL  from '../../../Helpers/API_URL.js';
import Chat from '../../../Assets/CHAT.svg';
import './MenungguKonfirmasi.css';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';


const MenungguKonfirmasi  = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/product/getresep`, headers)
        .then((res) => {
            console.log(res.data)
            setData(res.data)
    
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }, [])

    const printData = (props) => {
        return data.map((value, index) => {
            return (
                <div key={index}>
                    <div className="box-menunggu-konfirmasi">
                       <div className="inside-box-menunggu-konfirmasi">
                       <div className="detail-resep-judul">Detail Resep</div>
                        <div className="garis-dalam-detail-resep"></div>
                        <div className="gambar-resep-obat"></div>
                        <div className="box-nomor-resep-1">
                            <div className="tulisan-nomor-resep">Nomor Resep</div>
                            <div className="tulisan-isi-nomor-resep">{value.id}</div>
                            <div className="tulisan-tanggal-pengajuan">Tanggal Pengajuan:</div>
                            <div className="tulisan-isi-tanggal">{moment(value.tgl_pemesanan).format('LLL')}</div>
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
                    </div>
                </div>
            )
        })
    }

    if(localStorage.getItem('token')){
        return(
            <Navigate to='/homeadmin' />
        )
      }
    
      if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/' />
        )
    }

    return(
        <div className="container-menunggu-konfirmasi">
                <div className="d-lg-none d-md-none d-block">
                    <div className="box-judul-menunggu-konfirmasi">
                        <span className="material-icons pinggiran-atas-menunggu-konfirmasi">chevron_left</span>
                        <div className="judul-menunggu-konfirmasi">Menunggu Konfirmasi</div>
                    </div>
                </div>
                <div className="judul-menunggu-konfirmasi">Menunggu Konfirmasi</div>
                <div>
                    {printData()}
                </div>
                <div className="button-menunggu-konfirmasi">
                <div className="button-back-home-menunggu-konfirmasi" onClick={() => navigate('/')}>Kembali Ke Beranda</div>
                <div className="button-check-status-menunggu-konfirmasi" onClick={() => navigate('/semuapesanan')}>Check Status Pembayaran</div>
                </div>
        </div>
        
    )
}

export default MenungguKonfirmasi