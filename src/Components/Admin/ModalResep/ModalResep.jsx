import React from 'react';
import './ModalResep.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
    TransformComponent,
    TransformWrapper,
  } from "@pronestor/react-zoom-pan-pinch";
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import successImg from './../../../Assets/check-mark-illust.svg';
import cancelledImg from './../../../Assets/x-mark-illust.svg';

function ModalResep({transaksi, formattedDate, setOpenModal, setRerender}) {
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
            setSuccess(true)
            setLoading(false)
        })
        .catch((err) =>{
            setLoading(false)
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
        if(success || cancelled) {setRerender(true)}
    }

    return (
        <div className='modal-background fixed-top' onClick={() => setOpenModal(false)}>
            <div className='modal-container' style={{height:'560px', width:'800px'}} onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon'
                    style={{zIndex:'999'}}
                    onClick={() => setOpenModal(false)} />
            <div className='resep-top-container'>
                <p className='berhasil-ditambahkan'>Buat Salinan Resep</p>
            </div>
            <div className='resep-mid-container'>
                {
                    <div>
                        <div className='d-flex'>
                            <div style={{position:'relative', width:'330px', height:'430px', marginBottom:'15px', backgroundColor:'lightgray'}}>
                            <TransformWrapper
                                initialPositionX={0}
                                initialPositionY={0}
                                initialScale={1}
                            >
                                {({ zoomIn, zoomOut, ...rest }) => (
                                <>
                                    <TransformComponent>
                                    <div style={{backgroundColor:'lightgray', height:'430px', width:'330px', cursor:'move'}}>
                                    <img src={`${API_URL}/${transaksi.gambarResep}`} alt="" style={{height:'100%', width:'100%', objectFit:'contain'}} />
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
                            <div style={{width:'100%', marginLeft:'15px'}}>
                                <div className='d-flex justify-content-between' style={{width:'100%'}}>
                                    <div style={{width:'47%'}}>
                                        <p className='resep-label'>No. Pemesanan</p>
                                        <input type="text" className="input-alamat my-1" readOnly value={transaksi.no_pemesanan} />
                                    </div>
                                    <div style={{width:'47%'}}>
                                        <p className='resep-label'>Tgl. Pemesanan</p>
                                        <input type="text" className="input-alamat my-1" readOnly value={formattedDate} />
                                    </div>
                                </div>
                                <p className='resep-label mt-2'>Nama Pasien</p>
                                <input type="text" className="input-alamat my-1" placeholder='Masukkan nama pasien' />
                                <p className='resep-label mt-2'>Nama Dokter</p>
                                <input type="text" className="input-alamat my-1" placeholder='Masukkan nama dokter' />
                                <div className='resep-tambah-obat-container'>
                                    <p className='resep-mini-title'>Tambah Obat</p>
                                    <p className='resep-label'>Nama Obat</p>
                                    <input type="text" className="input-alamat my-1" placeholder='Cari nama obat' />
                                    <div className='d-flex justify-content-between mt-2' style={{width:'100%'}}>
                                        <div style={{width:'29%'}}>
                                            <p className='resep-label'>Kuantitas</p>
                                            <div className='d-flex align-items-center my-2'>
                                                <button id='qty-button-left-keranjang'
                                                // disabled={qty === 1} onClick={() => setQty(qty - 1)}
                                                ><FontAwesomeIcon icon={faMinus} className='qty-icon' /></button>
                                                <input type="number" id='qty-number-keranjang' style={{width:'40px'}}
                                                // onChange={(e) => {
                                                //     if(e.target.value.length !== 0){setQty(e.target.valueAsNumber)}
                                                //     if(e.target.value > product.stok){
                                                //         setTooManyProducts(true)
                                                //         setQty(product.stok)
                                                //     } else {setTooManyProducts(false)}}}
                                                // value={qty}
                                                    />
                                                <button id='qty-button-right-keranjang'
                                                // disabled={qty >= product.stok} onClick={() => setQty(qty + 1)}
                                                ><FontAwesomeIcon icon={faPlus} className='qty-icon' /></button>
                                            </div>
                                        </div>
                                        <div style={{width:'20%'}}>
                                            <p className='resep-label'>Satuan</p>
                                            <p className='resep-label my-2'>Botol</p>
                                        </div>
                                        <div style={{width:'42%'}}>
                                            <p className='resep-label'>Dosis</p>
                                            <input type="text" className="input-alamat my-1" placeholder='Contoh: 3x2 tab / hari' />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button className='resep-button-tambah-obat' onClick={() => {
                                            onConfirm()
                                        }}>Tambahkan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='resep-table-container'>
                            <p className='resep-mini-title mt-2 mb-3'>Rincian Obat</p>
                            <table class='resep-tabel-rincian mb-3'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Obat</th>
                                        <th>Harga per Satuan</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>Dosis</th>
                                        <th>Menu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Enervon-C Multivitamin (Botol)</td>
                                        <td>54000</td>
                                        <td>1</td>
                                        <td>sachet</td>
                                        <td>1 x 1 tablet / hari</td>
                                        <td><button className='resep-detail-edit'>Edit</button>
                                        <FontAwesomeIcon icon={faTrashCan} style={{color:'#E0004D', cursor:'pointer'}} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
            <div className='resep-bottom-container'>
                {/* <button className='button-tolak-pembayaran' onClick={() => {
                    onCancel()
                }}>Tolak Pesanan</button> */}
                <button className='button-konfirmasi-pembayaran' onClick={() => {
                    onConfirm()
                }}>Lanjutkan</button>
            </div>
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
                </div> : ''
            }
            </div>
        </div>
    )
}

export default ModalResep;