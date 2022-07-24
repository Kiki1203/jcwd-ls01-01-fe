import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';


const DashboardAdmin  = () => {
  const [tokenAdmin, setTokenAdmin] = useState('')
  const [data, setData] = useState('')
  const [stok, setStok] = useState('')
  const [pesananBaru, setPesananBaru] = useState('')
  const [pesananBaru2, setPesananBaru2] = useState('')
  const [pesananBaru3, setPesananBaru3] = useState('')
  const [siapKirim, setSiapkirim] = useState('')
  const [sedangKirim, setSedangkirim] = useState('')
  const [selesai, setSelesai] = useState('')
  const [batalkan, setBatalkan] = useState('')

  useEffect(() => {
    let token = localStorage.getItem('token')
    const headers = {
        headers: { 
            'Authorization': `${token}`,
        }
    }
    axios.get(`${API_URL}/admin/gettokenadmin`, headers)
    .then((res) => {
        setTokenAdmin(res.data[0].token)
      
        
    }).catch((err) => {
        console.log('ini err get',err)
    })
}, [tokenAdmin])

useEffect(() => {
    let token = localStorage.getItem('token')
    const headers = {
        headers: { 
            'Authorization': `${token}`,
        }
    }
    axios.get(`${API_URL}/admin/gethomedata`, headers)
    .then((res) => {
        console.log(res)
        setStok()
        setData(res.data.data.length)
        setPesananBaru(res.data.pesananBaru.length)
        setPesananBaru2(res.data.pesananBaru2.length)
        setPesananBaru3(res.data.pesananBaru3.length)
        setSiapkirim(res.data.siapKirim.length)
        setSedangkirim(res.data.sedangKirim.length)
        setSelesai(res.data.selesai.length)
        setBatalkan(res.data.dibatalkan.length)
    }).catch((err) => {
        console.log('ini err get',err)
    })
}, [])

const homePageAdmin = () => {
    var newPesanan = pesananBaru + pesananBaru2 + pesananBaru3
    return (
        <>
        <SidebarAdmin />
          <div className="container">
                  <div className="full-box-dashboard-admin-page">
                  <div className="tulisan-analisis-produk-admin">Analisis Produk & Toko</div>
                  <div className="keterangan-update-terakhir-barang">Update terakhir: 20 Januari 2022, 14.30 WIB</div>
                  <div className="box-1-dashboard-admin">
                      <div className="judul-profit-hari-ini">Profit Hari Ini</div>
                      <div className="nominal-total-profit-hari-ini">Rp 10.213.500</div>
                      <div className="row-profit-dashboard"><FontAwesomeIcon icon={faArrowCircleRight} className="" /></div>
                      <div className="keterangan-row-profit">+5.700.000</div>
                      <div className="prosentase-profit-box"></div>
                  </div>
                  <div className="box-2-dashboard-admin">
                      <div className="judul-total-pemesanan-today">Total Pemesanan Hari Ini </div>
                      <div  className="nominal-total-pemesanan-today">{data}</div>
                      <div className="row-2-profit-dashboard"><FontAwesomeIcon icon={faArrowCircleRight} className="" /></div>
                      <div className="keterangan-row-2-profit">-60</div>
                      <div className="prosentase-profit-box-2"></div>
                  </div>
                  <div className="box-3-dashboard-admin">
                      <div className="judul-sisa-stok-today">Sisa Stok Hari Ini</div>
                      <div className="nominal-sisa-stok-today">5.980</div>
                      <div className="row-sisa-stok-dashboard"><FontAwesomeIcon icon={faArrowCircleRight} className="" /></div>
                      <div className="keterangan-row-sisa-stok">+1.200</div>
                      <div className="prosentase-sisa-stok-box-2"></div>
                  </div>
                  <div className="tulisan-penting-hari-ini">Penting Hari Ini</div>
                  <div className="tulisan-aktivitas-dashboard">Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan</div>
                  <div className="box-pesanan-baru-dashboard-admin">
                      <div className="judul-box-pesanan">Pesanan Baru</div>
                      <div className="nominal-box-pesanan">{newPesanan}</div>
                  </div>
                  <div className="box-siap-dikirim-dashboard-admin">
                      <div className="judul-box-siap-dikirim">Siap Dikirim</div>
                      <div className="nominal-box-siap-dikirim">{siapKirim}</div>
                  </div>
                  <div className="box-sedang-dikirim-dashboard-admin">
                      <div className="judul-box-sedang-dikirim">Sedang Dikirim</div>
                      <div className="nominal-box-sedang-dikirim">{sedangKirim}</div>
                  </div>
                  <div className="box-selesai-dashboard-admin">
                      <div className="judul-box-selesai">Selesai</div>
                      <div className="nominal-box-selesai">{selesai}</div>
                  </div>
                  <div className="box-dibatalkan-dashboard-admin">
                      <div className="judul-box-dibatalkan">Dibatalkan</div>
                      <div className="nominal-box-dibatalkan">{batalkan}</div>
                  </div>
                  <div className="box-chat-baru-dashboard-admin">
                      <div className="judul-box-chat-baru">Chat Baru</div>
                      <div className="nominal-box-chat-baru">0</div>
                  </div>
                  <div className="tulisan-kadaluarsa-obat-dashboard">Kedaluwarsa Obat</div>
                  <div className="tulisan-cek-tanggal-kadaluarsa-dashboard">Cek tanggal kedaluwarsa untuk mengorganisir stok obat </div>
                  <div className="box-kadaluarsa-dashboard-admin">
                      <div className="keterangan-telah-expired">Telah Kedaluwarsa</div>
                      <div className="nominal-telah-expired">0</div>
                      <div className="keterangan-expired-bulan-ini">Kedaluwarsa Bulan Ini</div>
                      <div className="jumlah-expired-bulan-ini">0</div>
                      <div className="keterangan-expired-3-bulan-lagi">Kedaluwarsa 3 Bulan Kedepan</div>
                      <div className="nominal-expired-3-bulan-lagi">0</div>
                  </div>
                  <div className="box-profit-dashboard-admin">
                      <div className="judul-dalam-box-profit">Profit</div>
                      <div className="keterangan-dalam-box-profit">Data dinyatakan dalam jutaan rupiah</div>
                      <div className="dropdown-dalam-box-profit">Dropdown</div>
                      <div className="grafix-box-dalam-box-profit"></div>
                  </div>
                  <div className="box-penjualan-obat-dashboard-admin">
                      <div className="tulisan-pejualan-obat-1">Penjualan Obat</div>
                      <div className="garis-1-dalam-box-pejualan-obat"></div>
                      <div className="keterangan-dalam-box-pejualan-obat">Obat Bebas</div>
                      <div className="dropdown-dalam-box-pejualan-obat">Dropdown</div>
                      <div className="grafix-box-dalam-box-pejualan-obat"></div>
                  </div>
                  </div>
          </div>
        </>
    );
  }

    if(localStorage.getItem('myTkn')){
        if(localStorage.getItem('myTkn') === tokenAdmin){
            return(
                <>{homePageAdmin()}</>
            )
        }else{
            return(
                <Navigate to='/' />
            )
        }
    }else{
        if(localStorage.getItem('token') === tokenAdmin){
            return(
                <>{homePageAdmin()}</>
            )
        }else if(!localStorage.getItem('token')){
            return(
                <Navigate to='/loginadmin' />
            )
        }
    }
  

    
}

export default DashboardAdmin