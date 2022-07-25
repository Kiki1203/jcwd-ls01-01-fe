import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAngleDown, faCommentDots, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './TransactionCard.css'
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import ConfirmPaymentModal from '../ConfirmPaymentModal/ConfirmPaymentModal';
import TransactionModal from '../TransactionModal/TransactionModal';
import ModalResep from '../ModalResep/ModalResep';
import TransactionDetail from '../TransactionDetail/TransactionDetail';

function TransactionCard({transaksi, setRerender}) {
    const [loading, setLoading] = useState(false)
    const [formattedDate, setFormattedDate] = useState('')
    const [kirim, setKirim] = useState(false)
    const [tolak, setTolak] = useState(false)
    const [mdlTransaksi, setMdlTransaksi] = useState(false)
    const [mdlConfirm, setMdlConfirm] = useState(false)
    const [mdlResep, setMdlResep] = useState(false)
    const [mdlDetail, setMdlDetail] = useState(false)
    const status = transaksi.statusTransaksi_id
    const token = localStorage.getItem('token')

    useEffect(() => {
        setFormattedDate(
        (transaksi.created_at.substr(8,1) == 0 ? transaksi.created_at.substr(9,1) : transaksi.created_at.substr(8,2))
        + ' ' +
        (transaksi.created_at.substr(5,2) == '01' ? 'Jan' :
        transaksi.created_at.substr(5,2) == '02' ? 'Feb' :
        transaksi.created_at.substr(5,2) == '03' ? 'Mar' :
        transaksi.created_at.substr(5,2) == '04' ? 'Apr' :
        transaksi.created_at.substr(5,2) == '05' ? 'Mei' :
        transaksi.created_at.substr(5,2) == '06' ? 'Jun' :
        transaksi.created_at.substr(5,2) == '07' ? 'Jul' :
        transaksi.created_at.substr(5,2) == '08' ? 'Agu' :       
        transaksi.created_at.substr(5,2) == '09' ? 'Sep' :
        transaksi.created_at.substr(5,2) == '10' ? 'Okt' :
        transaksi.created_at.substr(5,2) == '11' ? 'Nov' :
        'Des')
        + ' ' + transaksi.created_at.substr(0,4)
        + ', ' + transaksi.created_at.substr(11,5) + ' WIB'
        )
    }, [transaksi])

    useEffect(() => {
        if(kirim || tolak){
            setMdlTransaksi(true)
            overflowYHidden()
        }
    }, [kirim, tolak])

    const totalQtyFunc = () => {
        let total = 0
        transaksi.produk.forEach(p => {
            total += p.quantity
        });
        return total
    }

    const totalHargaFunc = () => {
        let total = 0
        transaksi.produk.forEach(p => {
            total += p.quantity * p.harga_produk
        });
        return total
    }

    const onKirim = () => {
        setLoading(true)
        axios.patch(API_URL + '/admin/continuetransaction', {id: transaksi.id}, {headers: {authorization: token}})
        .then((res) => {
            setKirim(true)
            setLoading(false)
        })
        .catch((err) =>{
            setLoading(false)
        })
    }

    const onTolak = () => {
        setLoading(true)
        axios.patch(API_URL + '/admin/canceltransaction', {id: transaksi.id}, {headers: {authorization: token}})
        .then((res) => {
            setTolak(true)
            setLoading(false)  
        })
        .catch((err) =>{
            setLoading(false)
        })
    }

    const overflowYHidden = () => {
        let elems = document.getElementsByClassName('admin-page-container');
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.overflow = "hidden";
        }
    }

    return (
        <div className='kartu-transaksi'>
            {
                mdlConfirm && <ConfirmPaymentModal transaksi={transaksi}
                                     setOpenModal={setMdlConfirm}
                                     setRerender={setRerender} />
            }
            {
                mdlTransaksi && <TransactionModal jenis={kirim ? 'kirim' : tolak ? 'tolak' : ''}
                                     setOpenModal={setMdlConfirm}
                                     setRerender={setRerender} />
            }
            {
                mdlResep && <ModalResep transaksi={transaksi}
                                     formattedDate={formattedDate}
                                     setOpenModal={setMdlResep}
                                     setRerender={setRerender} />
            }
            {
                mdlDetail && <TransactionDetail transaksi={transaksi}
                                    setOpenModal={setMdlDetail} />
            }
            <div className='d-flex align-items-center' style={{gap:'10px', padding:'20px 30px'}}>
                <label className='transaksi-16-bold'>
                    <input type="checkbox" className='me-2' />
                    {
                        status == 1 ? 'Resep Baru' :
                        status == 2 ? 'Menunggu Bukti Pembayaran' :
                        status == 3 ? 'Cek Bukti Pembayaran' :
                        status == 4 ? 'Pesanan Diproses' :
                        status == 5 ? 'Sedang Dikirim' :
                        status == 6 ? 'Pesanan Selesai' :
                        status == 7 ? 'Pesanan Dibatalkan' :
                        status == 8 ? 'Menunggu Checkout' : ''
                    }
                </label>
                <p style={{color:'#B4B9C7', margin:'0'}}>/</p>
                <p className='transaksi-16-bold'>{transaksi.no_pemesanan}</p>
                <p style={{color:'#B4B9C7', margin:'0'}}>/</p>
                <div className='d-flex align-items-center'>
                    <FontAwesomeIcon icon={faClock} style={{margin:'0px 10px 0px 0px', color:'#B4B9C7', fontSize:'16px'}} />
                    <p style={{margin:'0', color:'#B4B9C7', fontSize:'16px'}}>{formattedDate}</p>
                </div>
            </div>
            <hr style={{margin:'0px'}} />
            <div>
                <div className='d-flex' style={{padding:'15px 30px'}}>
                    <img src={`${API_URL}/${transaksi.gambarResep ? transaksi.gambarResep : transaksi.produk.length ? transaksi.produk[0].gambar_produk : ''}`} alt="" className='transaksi-gambar'/>
                    {
                        status == 1 || transaksi.produk.length === 0 ? <div className='transaksi-detail-kiri'>
                            <p className='transaksi-detail-header'>Resep Dokter</p>
                            <button className='transaksi-salinan-resep' disabled={status == 7}
                                onClick={() => {setMdlResep(true); overflowYHidden()}}>Buat Salinan Resep</button>
                        </div> :
                        <div className='transaksi-detail-kiri'>
                            <p className='transaksi-detail-header'>{transaksi.produk[0].nama_produk}</p>
                            <p className='transaksi-detail-harga'>{`${transaksi.produk[0].quantity} x ${(transaksi.produk[0].harga_produk / transaksi.produk[0].quantity).toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
                            {
                                transaksi.produk.length > 1 && <button className='transaksi-lihat-lainnya'
                                onClick={() => {setMdlDetail(true); overflowYHidden()}}>
                                    {`Lihat ${transaksi.produk.length - 1} produk lainnya`}
                                    <FontAwesomeIcon icon={faAngleDown} style={{marginLeft:'10px'}} />
                                </button>
                            }
                        </div>
                    }
                    <div className='transaksi-detail-kanan'>
                        <div style={{width:'25%', padding:'0px 30px'}}>
                            <p className='transaksi-detail-header'>Pembeli</p>
                            <p className='transaksi-detail-konten'>{transaksi.username}</p>
                        </div>
                        <div style={{width:'50%'}}>
                            <p className='transaksi-detail-header'>Alamat</p>
                            <p className='transaksi-detail-konten'>{transaksi.no_pemesanan.includes('RSP') ? '-' : `${transaksi.alamat}, ${transaksi.kabupaten_kota}, ${transaksi.provinsi}`}</p>
                        </div>
                        <div style={{width:'25%', padding:'0px 30px'}}>
                            <p className='transaksi-detail-header'>Kurir</p>
                            <p className='transaksi-detail-konten'>{transaksi.no_pemesanan.includes('RSP') ? '-' : transaksi.kurir}</p>
                        </div>
                    </div>
                </div>
                {
                    transaksi.produk.length > 0 && <div className='transaksi-total-harga'>
                        <div className='d-flex align-items-center' style={{gap:'7px'}}>
                            <p className='transaksi-16-bold'>Total Harga</p>
                            <p className='transaksi-detail-konten'>{`(${totalQtyFunc()} produk)`}</p>
                        </div>
                        <p className='transaksi-16-bold'>{`Rp ${(transaksi.total_pembayaran ? transaksi.total_pembayaran : totalHargaFunc()).toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
                    </div>
                }
                <div className='d-flex justify-content-between' style={{padding:'15px 30px 20px'}}>
                    <div className='d-flex' style={{gap:'30px'}}>
                        <button className='transaksi-button-icon'>
                            <FontAwesomeIcon icon={faCommentDots} style={{fontSize:'18px', marginRight:'10px'}} />
                            Chat Pembeli
                        </button>
                        <button className='transaksi-button-icon'
                            onClick={() => {setMdlDetail(true); overflowYHidden()}}>
                            <FontAwesomeIcon icon={faClipboardList} style={{fontSize:'18px', marginRight:'10px'}} />
                            Detail Pesanan
                        </button>
                    </div>
                    <div className='d-flex' style={{gap:'30px'}}>
                        {(status == 1 || status == 2 || status == 3) &&
                            <button className='tolak-pesanan-button'
                             onClick={() => onTolak()}>Tolak Pesanan</button>}
                        {(status == 1 || status == 2) ? <button className='terima-pesanan-button'
                            disabled={status == 2}
                            onClick={() => {setMdlResep(true); overflowYHidden()}}>Terima Pesanan</button>
                         : status == 3 ? <button className='terima-pesanan-button' 
                           onClick={() => {setMdlConfirm(true); overflowYHidden()}}
                           style={{fontSize:'12px'}}>Cek Bukti Pembayaran</button>
                         : status == 4 ?<button className='terima-pesanan-button'
                                         style={{fontSize:'12px'}}
                                         onClick={() => onKirim()}>Kirim Pesanan</button>
                         : (status == 5 || status == 6 || status == 7) ? <button className='terima-pesanan-button'>Lihat Rincian</button> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionCard;