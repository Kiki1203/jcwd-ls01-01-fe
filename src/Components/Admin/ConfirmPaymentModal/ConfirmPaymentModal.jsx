import React from 'react';
import './ConfirmPaymentModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
import {
    TransformComponent,
    TransformWrapper,
  } from "@pronestor/react-zoom-pan-pinch";
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import successImg from './../../../Assets/check-mark-illust.svg';
import cancelledImg from './../../../Assets/x-mark-illust.svg';
import Swal from 'sweetalert2';
import { PulseLoader } from 'react-spinners';

function ConfirmPaymentModal({transaksi, setOpenModal, setRerender}) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [cancelled, setCancelled] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        setSuccess(false)
        setCancelled(false)
    }, [transaksi])

    const onConfirm = () => {
        setLoading(true)
        axios.patch(API_URL + '/admin/continuetransaction', {id: transaksi.id}, {headers: {authorization: token}})
        .then((res) => {
            axios.post(API_URL + '/admin/reducestock', {transaksi:transaksi}, {headers: {authorization: token}})
            .then((response) => {
                setSuccess(true)
                setLoading(false)
            })
            .catch((error) =>{
                setLoading(false)
                Swal.fire({
                    title: 'Error!',
                    text: 'Terjadi kesalahan :(',
                    icon: 'error',
                    confirmButtonText: 'Oke',
                    confirmButtonColor: '#E0004D'
                })
            })
        })
        .catch((err) =>{
            setLoading(false)
            Swal.fire({
                title: 'Error!',
                text: 'Terjadi kesalahan :(',
                icon: 'error',
                confirmButtonText: 'Oke',
                confirmButtonColor: '#E0004D'
            })
        })
    }

    const onCancel = () => {
        setLoading(true)
        axios.patch(API_URL + '/admin/canceltransaction', {id: transaksi.id}, {headers: {authorization: token}})
        .then((res) => {
            setCancelled(true)
            setLoading(false)  
        })
        .catch((err) =>{
            setLoading(false)
        })
    }

    const handleClose = () => {
        setOpenModal(false)
        let elems = document.getElementsByClassName('admin-page-container');
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.overflow = "auto";
        }
        if(success || cancelled) {setRerender(true)}
    }

    return (
        <div className='modal-background fixed-top' onClick={() => handleClose()}>
            <div className='modal-container' style={{height:'440.7px'}} onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => handleClose()} />
            {
                success ? <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <img src={successImg} style={{height:'200px', marginBottom:'20px'}} alt="" />
                    <p className='berhasil-ditambahkan'>Pesanan Berhasil Dikonfirmasi!</p>
                    <p className='confirm-payment-detail'>Mohon untuk menyiapkan pesanan agar dapat segera dikirimkan</p>
                </div> :
                cancelled ? <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <img src={cancelledImg} style={{height:'200px', marginBottom:'20px'}} alt="" />
                    <p className='berhasil-ditambahkan'>Pesanan Berhasil Ditolak</p>
                    <p className='confirm-payment-detail'>Pesanan otomatis dipindahkan ke tab 'Pesanan Dibatalkan'</p>
                </div>  :
                <>
                <p className='berhasil-ditambahkan'>Konfirmasi Bukti Pembayaran</p>
                <div style={{position:'relative', marginBottom:'22px', backgroundColor:'lightgray'}}>
                <TransformWrapper
                    initialPositionX={0}
                    initialPositionY={0}
                    initialScale={1}
                >
                    {({ zoomIn, zoomOut, ...rest }) => (
                    <>
                        <TransformComponent>
                        <div style={{backgroundColor:'lightgray', height:'250px', width:'530px', cursor:'move'}}>
                        <img src={`${API_URL}/${transaksi.bukti_pembayaran}`} alt="" style={{height:'100%', width:'100%', objectFit:'contain'}} />
                        </div>
                        </TransformComponent>
                        <div style={{position:'absolute', bottom:'7px', right:'10px', gap:'30px'}}>
                        <button className='zoom-buttons' onClick={() => zoomIn()}>
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus}
                             style={{filter:'drop-shadow(0px 0px 3px gray)'}} />
                        </button>
                        <button className='zoom-buttons' onClick={() => zoomOut()}>
                            <FontAwesomeIcon icon={faMagnifyingGlassMinus}
                             style={{filter:'drop-shadow(0px 0px 3px gray)'}} />
                        </button>
                        </div>
                    </>
                    )}
                </TransformWrapper>
                </div>
                    <div className='d-flex justify-content-center' style={{gap:'20px'}}>
                        <button className='button-tolak-pembayaran'
                            disabled={loading}
                            onClick={() => onCancel()}>
                            {loading ? <PulseLoader size={3} margin={3} color='#E0004D' /> : 'Tolak Pesanan'}</button>
                        <button className='button-konfirmasi-pembayaran'
                            disabled={loading}
                            onClick={() => onConfirm()}>
                            {loading ? <PulseLoader size={3} margin={3} color='#ffffff' /> : 'Konfirmasi'}</button>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default ConfirmPaymentModal;