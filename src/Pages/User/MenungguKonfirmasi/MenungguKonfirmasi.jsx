import axios from 'axios';
import React, { useState, useEffect } from "react";
import API_URL  from '../../../Helpers/API_URL.js';
import Chat from '../../../Assets/CHAT.svg';
import './MenungguKonfirmasi.css';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import ModalZoomResep from './ModalZoomResep.jsx';

import FooterMobile from "../../../Components/User/Footer/FooterMobile.jsx"

const MenungguKonfirmasi  = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState('')
    const [tokenUser, setTokenUser] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const [gambar, setGambar] = useState("")
    useEffect(() => {
      
      let tokens = localStorage.getItem('myTkn')
      const headers = {
          headers: { 
              'Authorization': `${tokens}`,
          }
      }
      axios.get(`${API_URL}/user/checkuserverify`, headers)
      .then((res) => {
        
          setVerified(res.data.verified)
          setTokenUser(res.data.token)
      }).catch((err) => {
          console.log('ini err get',err)
         
      })
    }, [tokenUser, verified])

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

    const onBtnDeleteProduct = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        setLoading(true)
       
        axios.delete(API_URL + `/product/deleteresep?id=${id}`, headers)
        .then((res) => {
        console.log(res)
        setLoading(false)
        setData(res.data)
        })
        .catch((err) =>{
        console.log(err)
            setLoading(false)
        })
      }

      const openZoom = (gambar) => {
        console.log('gambar', gambar)
        setOpenModal(true)
        setGambar(gambar)
      }
     

    const printData = (props) => {
        return data.map((value, index) => {
            return (
                <div key={index}>
                      {
                        openModal && <ModalZoomResep setOpenModal={setOpenModal} setGambar={gambar}/>
                 }
                    <div className="box-menunggu-konfirmasi">
                       <div className="inside-box-menunggu-konfirmasi">
                       <div className="detail-resep-judul">Detail Resep</div>
                        <div className="garis-dalam-detail-resep"></div>
                        <div>
                        <img src={`${API_URL + '/'}${value.gambar_resep}`} alt='Image Preview' className="gambar-resep-obat" />

                        </div>
                        <div className="box-nomor-resep-1">
                            <div className="tulisan-nomor-resep">Nomor Resep</div>
                            <div className="tulisan-isi-nomor-resep">{value.no_pemesanan}</div>
                            <div className="tulisan-tanggal-pengajuan">Tanggal Pengajuan:</div>
                            <div className="tulisan-isi-tanggal">{moment(value.tgl_pemesanan).format('LLL')}</div>
                        </div>
                        <div className="tulisan-perbesar-gambar" onClick={() => openZoom(value.gambar_resep)}>Perbesar Gambar</div>
                        <div className='tulisan-menunggu-balasan'>Mohon menunggu balasan dari apoteker selama 5 menit</div>
                        <div className='timer-logo-menunggu-konfirmasi'>Timer</div>
                        <div className="garis-dalam-detail-resep-2"></div>
                        <div className="box-batalkan-pengajuan d-flex">
                            <button className="tulisan-batalkan-pengajuan" disabled={loading} onClick={() => onBtnDeleteProduct(value.transaksi_id)}>
                                {
                                    loading ?
                                    'Loading...'
                                    :
                                    'Batalkan Pengajuan'
                                }
                            </button>
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


    const menungguKonfirmasi = () => {
        return(
           <>
            <div className="container-menunggu-konfirmasi">
             
             <div className="d-lg-none d-md-none d-block d-flex navbar-pro">
                      <div>
                          <Link to='/' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "30px", marginLeft:"10px" }}>
                              <FontAwesomeIcon icon={faAngleLeft} className="logo-1-p"/>
                          </Link>
                      </div>
                      <div className="keterangan-verifikasi-desk"  style={{marginTop: "35px", marginLeft: "30px"}}>Menungggu Konfirmasi Resep</div>
                  </div>
                  <div className="d-lg-block d-md-block d-none">
                  <div className="mx-4 mt-4 keterangan-verifikasi-desk">Menungggu Konfirmasi Resep</div>
                  </div>
              <div>
                  {printData()}
              </div>
              <div className="button-menunggu-konfirmasi">
              <div className="button-back-home-menunggu-konfirmasi" onClick={() => navigate('/')}>Kembali Ke Beranda</div>
              <div className="button-check-status-menunggu-konfirmasi" onClick={() => navigate('/semuapesanan')}>Check Status Pembayaran</div>
              </div>
             
      </div>
      <FooterMobile/>
           </>
            
        )
    }

    if(localStorage.getItem('myTkn')){
        if(verified === 0){
          return(
            <Navigate to='/verification' />
          )
        }else{
          return(
            <>{menungguKonfirmasi()}</>
          )
        }
      }else{
        if(localStorage.getItem('token') === tokenUser){
          if(verified === 0){
            return(
              <Navigate to='/verification' />
            )
          }else{
            return(
              <>{menungguKonfirmasi()}</>
            )  
          }
        }else{
          return(
            <Navigate to='/' />
          ) 
        }
      }
   
}

export default MenungguKonfirmasi