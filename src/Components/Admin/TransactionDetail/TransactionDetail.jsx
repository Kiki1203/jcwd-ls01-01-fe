import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import API_URL  from '../../../Helpers/API_URL.js';

function TransactionDetail({transaksi, setOpenModal}) {
    const handleClose = () => {
        let elems = document.getElementsByClassName('admin-page-container');
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.overflow = "auto";
        }
        setOpenModal(false)
    }

    const totalHargaFunc = () => {
        let total = 0
        transaksi.produk.forEach(p => {
            total += p.harga_produk * p.quantity
        })
        return total
    }

    return (
        <div className='modal-background fixed-top' onClick={() => handleClose()}>
            <div className='modal-container' style={{height:'440.7px'}} onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon' style={{zIndex:'999'}} onClick={() => handleClose()} />
                <div className='resep-top-container justify-content-center align-items-end' style={{padding:'0px'}}>
                    <p className='berhasil-ditambahkan' style={{margin:'0px'}}>Detail Pesanan</p>
                </div>
                <div className='resep-mid-container d-flex justify-content-between' style={{height:'calc(100% - 80px)', flexDirection:'column'}}>
                    <div style={{padding:'5px 20px 20px 0px'}}>
                    {
                        transaksi.produk.map((p) => {
                        return <div key={p.Produk_id}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img className='gambar-produk-keranjang' src={`${API_URL}/${p.gambar_produk}`} alt="" />
                                    <div>
                                        <p className='nama-produk-keranjang'>{p.nama_produk}</p>
                                        <p className='quantity-produk-keranjang'>{`Rp${p.harga_produk.toLocaleString('de-DE', {minimumFractionDigits: 0})} x ${p.quantity}`}</p>
                                    </div>
                                </div>
                                <p className='harga-produk-keranjang'>{'Rp' + (p.harga_produk * p.quantity).toLocaleString('de-DE', {minimumFractionDigits: 0})}</p>
                            </div>
                        </div>
                        })
                    }
                    </div>
                    <div className='m-3 p-2 d-flex justify-content-between align-items-center' style={{backgroundColor:'#ffe9f1'}}>
                        <div>
                            <p className='nama-produk-keranjang' style={{fontSize:'14px', fontWeight:'700'}}>{`Subtotal: Rp ${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
                            <p className='nama-produk-keranjang' style={{fontSize:'14px', fontWeight:'700'}}>{`Ongkir: ${transaksi.total_pembayaran ? `Rp ${(transaksi.total_pembayaran - totalHargaFunc()).toLocaleString('de-DE', {minimumFractionDigits: 0})}` : 'belum checkout'}`}</p>
                        </div>
                        <p className='harga-produk-keranjang'>{`Total: ${transaksi.total_pembayaran ? `Rp ${transaksi.total_pembayaran.toLocaleString('de-DE', {minimumFractionDigits: 0})}` : 'belum checkout'}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetail;