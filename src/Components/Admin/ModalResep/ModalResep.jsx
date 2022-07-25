import React from 'react';
import './ModalResep.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlassPlus, faMagnifyingGlassMinus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
    TransformComponent,
    TransformWrapper,
  } from "@pronestor/react-zoom-pan-pinch";
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import successImg from './../../../Assets/check-mark-illust.svg';
import cancelledImg from './../../../Assets/x-mark-illust.svg';
import SearchBubbleResep from './SearchBubbleResep';
import TableContent from './TableContent';
import Swal from 'sweetalert2';
import { PulseLoader } from 'react-spinners';

function ModalResep({transaksi, formattedDate, setOpenModal, setRerender}) {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [dokter, setDokter] = useState('')
    const [pasien, setPasien] = useState('')
    const [obatForm, setObatForm] = useState({id:'', nama:'', harga:0, qty:1, satuan:'-', dosis:'', stok:0, gambar:''})
    const [arrObat, setArrObat] = useState([])
    const [search, setSearch] = useState('')
    const [searchRes, setSearchRes] = useState([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchBubbleOpen, setSearchBubbleOpen] = useState(false)
    const [errTambahObat, setErrTambahObat] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [success, setSuccess] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(search.length){
          axios.get(`${API_URL}/product/searchproducts?entry=${search}`, {headers: {'Access-Control-Allow-Origin': '*'}})
          .then((res) => {
              setSearchRes(res.data.products)
          }).catch((err) => {
              console.log('Error di search:', err)
          })
        }
      }, [search])

    useEffect(() => {
        if(obatForm.qty >= 1 && obatForm.qty <= obatForm.stok && obatForm.dosis && obatForm.id){
            setErrTambahObat(null)
        }
    }, [obatForm])

    useEffect(() => {
        if(pasien && dokter && arrObat.length > 0){
            setErrMsg(null)
        }
    }, [pasien, dokter, arrObat])

    const onSubmit = () => {
        setLoading(true)
        axios.post(API_URL + '/admin/salinresep',
        {
            transaction: transaksi,
            products:arrObat,
            pasien:pasien,
            dokter:dokter
        },
        {headers: {authorization: token}})
        .then((res) => {
            setSuccess(true)
            setPage(3)
            setLoading(false)
        })
        .catch((err) =>{
            Swal.fire({
                title: 'Error!',
                text: 'Terjadi suatu kesalahan :(',
                icon: 'error',
                confirmButtonText: 'Oke',
                confirmButtonColor: '#E0004D'
            })
            setLoading(false)
        })
    }

    const totalHargaFunc = () => {
        let total = 0
        arrObat.forEach((obat) => {
            total += obat.harga * obat.qty
        })
        return total
    }

    const handleClose = () => {
        let elems = document.getElementsByClassName('admin-page-container');
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.overflow = "auto";
        }
        setOpenModal(false)
        if(success) {setRerender(true)}
    }

    return (
        <div className='modal-background fixed-top' onClick={() => handleClose()}>
            <div className='modal-container' style={{height:'560px', width:'800px'}} onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon'
                    style={{zIndex:'999'}}
                    onClick={() => handleClose()} />
            <div className='resep-top-container'>
                {page ===1 && <p className='berhasil-ditambahkan'>Buat Salinan Resep</p>}
            </div>
            <div className='resep-mid-container'>
                {
                    page === 1 ? <div>
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
                                <input type="text" className="input-alamat my-1" placeholder='Masukkan nama pasien'
                                    onChange={(e) => {setPasien(e.target.value)}}
                                    value={pasien} />
                                <p className='resep-label mt-2'>Nama Dokter</p>
                                <input type="text" className="input-alamat my-1" placeholder='Masukkan nama dokter'
                                    onChange={(e) => {setDokter(e.target.value)}}
                                    value={dokter} />
                                <div className='resep-tambah-obat-container'>
                                    <p className='resep-mini-title'>Tambah Obat</p>
                                    <p className='resep-label'>Nama Obat</p>
                                    <div style={{position:'relative'}}>
                                        <input type="text" className="input-alamat my-1" value={search} placeholder='Cari nama obat'
                                            onChange={(e) => {setSearch(e.target.value)
                                                              if(e.target.value){setSearchBubbleOpen(true)}
                                                              else{setSearchBubbleOpen(false)}}} />
                                        {
                                            searchBubbleOpen && <SearchBubbleResep 
                                                                result={searchRes}
                                                                setObat={setObatForm}
                                                                setSearch={setSearch}
                                                                setBubbleOpen={setSearchBubbleOpen}
                                                                loading={searchLoading} />
                                        }
                                    </div>
                                    <div className='d-flex justify-content-between mt-2' style={{width:'100%'}}>
                                        <div style={{width:'29%'}}>
                                            <p className='resep-label'>Kuantitas</p>
                                            <div className='d-flex align-items-center my-2'>
                                                <button id='qty-button-left-keranjang'
                                                    disabled={obatForm.qty <= 1}
                                                    onClick={() => {setObatForm({...obatForm, qty:obatForm.qty-1})
                                                                    if(obatForm.qty<=obatForm.stok){setErrTambahObat(null)}}}
                                                ><FontAwesomeIcon icon={faMinus} className='qty-icon' /></button>
                                                <input type="number" id='qty-number-keranjang' style={{width:'40px'}}
                                                onChange={(e) => {
                                                    if(e.target.value.length !== 0){setObatForm({...obatForm, qty:e.target.valueAsNumber})}
                                                    if(e.target.value > obatForm.stok){
                                                        setErrTambahObat('Kuantitas melebihi stok')
                                                    } else if(e.target.value < 1 && e.target.value.length !== 0){
                                                        setErrTambahObat('Minimal kuantitas 1')
                                                    } else {setErrTambahObat(null)}
                                                }}
                                                value={obatForm.qty}
                                                    />
                                                <button id='qty-button-right-keranjang'
                                                 disabled={obatForm.qty >= obatForm.stok}
                                                 onClick={async () => {await setObatForm({...obatForm, qty:obatForm.qty+1})
                                                                 if(obatForm.qty >= 1 && obatForm.qty<=obatForm.stok){setErrTambahObat(null)}}}
                                                ><FontAwesomeIcon icon={faPlus} className='qty-icon' /></button>
                                            </div>
                                        </div>
                                        <div style={{width:'20%'}}>
                                            <p className='resep-label'>Satuan</p>
                                            <p className='resep-label my-2'>{obatForm.satuan}</p>
                                        </div>
                                        <div style={{width:'42%'}}>
                                            <p className='resep-label'>Dosis</p>
                                            <input type="text" className="input-alamat my-1" placeholder='Contoh: 3x2 tab / hari'
                                                onChange={(e) => setObatForm({...obatForm, dosis:e.target.value})}
                                                value={obatForm.dosis} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end align-items-center mt-3' style={{gap:'10px'}}>
                                        {
                                            errTambahObat && <p className='error-message'>{errTambahObat}</p>
                                        }
                                        <button disabled={errTambahObat} className='resep-button-tambah-obat' onClick={() => {
                                            let temporary = [...arrObat, obatForm]
                                            if(!obatForm.id){
                                                return setErrTambahObat('Id obat tidak ditemukan, mohon pilih dari hasil search')
                                            } else if(!obatForm.dosis){
                                                return setErrTambahObat('Dosis tidak boleh kosong')
                                            } else {
                                                setErrTambahObat(null)
                                                setArrObat(temporary)
                                            }
                                            setObatForm({id:'', nama:'', harga:0, qty:1, satuan:'-', dosis:'', stok:0})
                                            setSearch('')
                                        }}>Tambahkan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {arrObat.length > 0 && <div className='resep-table-container'>
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
                                {
                                    arrObat.map((obat, index) => <TableContent index={index} obat={obat} arrObat={arrObat} setArrObat={setArrObat} /> )
                                }
                                </tbody>
                            </table>
                        </div>}
                    </div> : page === 2 ? 
                    <div style={{width:'100%', padding:'0px 30px'}}>
                        <p className='berhasil-ditambahkan' style={{marginBottom:'40px'}}>Ringkasan Resep</p>
                        <p>Silakan periksa detail pesanan berikut:</p>
                        <div className='d-flex mb-3' style={{gap:'10px'}}>
                            <p className='transaksi-16-bold'>{transaksi.username}</p>
                            <p style={{color:'#B4B9C7', margin:'0'}}>/</p>
                            <p className='transaksi-16-bold'>{transaksi.no_pemesanan}</p>
                            <p style={{color:'#B4B9C7', margin:'0'}}>/</p>
                            <p style={{margin:'0', color:'#B4B9C7', fontSize:'16px'}}>{formattedDate}</p>
                        </div>
                        {
                            arrObat.map((obat) => {
                                return <div className='d-flex justify-content-between mb-2'>
                                    <div>
                                        <p className='transaksi-detail-header'>{obat.nama}</p>
                                        <div className='d-flex' style={{gap:'10px'}}>
                                            <p className='transaksi-detail-harga'>{`Rp ${obat.harga.toLocaleString('de-DE', {minimumFractionDigits: 0})} x ${obat.qty} ${obat.satuan}`}</p>
                                            <p className='transaksi-detail-harga'>/</p>
                                            <p className='transaksi-detail-harga'>{`Dosis: ${obat.dosis}`}</p>
                                        </div>
                                    </div>
                                    <p className='transaksi-detail-header'>{`Total: Rp ${(obat.harga * obat.qty).toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
                                </div>
                            })
                        }
                        <div className='transaksi-total-harga' style={{margin:'0px', marginTop:'50px'}}>
                            <div className='d-flex align-items-center' style={{gap:'7px'}}>
                                <p className='transaksi-16-bold'>Total Harga</p>
                                <p className='transaksi-detail-konten'>{`(${arrObat.length} produk)`}</p>
                            </div>
                            <p className='transaksi-16-bold'>{`Rp ${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
                        </div>  
                    </div> : page === 3 ? 
                    <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <img src={successImg} style={{height:'200px', marginBottom:'20px'}} alt="" />
                        <p className='berhasil-ditambahkan'>Pesanan Berhasil Dibuat!</p>
                        <p className='confirm-payment-detail'>Silakan menunggu user untuk melakukan checkout</p>
                    </div> : ''
                }
            </div>
            {page !== 3 && <div className='resep-bottom-container'>
                {
                    errMsg && <p className='error-message'>{errMsg}</p>
                }
                {page === 2 && <button className='button-tolak-pembayaran'
                    disabled={loading}
                    onClick={() => setPage(1)}>
                    {loading ? <PulseLoader size={3} margin={3} color='#E0004D' /> : 'Kembali'}</button>}
                {page === 1 && <button className='button-konfirmasi-pembayaran' onClick={() => {
                    if(!pasien || !dokter){
                        setErrMsg('Nama pasien dan dokter harus diisi')
                    } else if(arrObat.length < 1) {
                        setErrMsg('Harus ada minimal 1 obat')
                    } else {
                        setPage(2)
                    }
                }}>Lanjutkan</button>}
                {page === 2 && <button className='button-konfirmasi-pembayaran'
                    disabled={loading}
                    onClick={() => onSubmit()}>
                    {loading ? <PulseLoader size={3} margin={3} color='#ffffff' /> : 'Simpan'}</button>
                }
                </div>}
            </div>
        </div>
    )
}

export default ModalResep;