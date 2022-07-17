import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Payment.css';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PaymentProof from '../../../Components/User/PaymentProof/PaymentProof';

const Payment = () => {
    const [transaction, setTransaction] = useState({})
    const [metodePembayaran, setMetodePembayaran] = useState({})
    const [products, setproducts] = useState([])
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const params = useParams()
    const transactionId = params.id
    const token = localStorage.getItem('myTkn')
    const navigate = useNavigate()

    useEffect(() => {
      setLoading(true)
      axios.get(`${API_URL}/transaction/getpaymentdetails?transactionid=${transactionId}`, {headers: {authorization: token}})
      .then(res => {
        setTransaction(res.data.transaction)
        setMetodePembayaran(res.data.metodePembayaran)
        setproducts(res.data.products)
      })
      .catch(e => {
        console.log('masuk error payment', e)
        setLoading(false)
      })
    }, [])

    useEffect(() => {
      if(transaction.totalPembayaran && metodePembayaran.id && products.length) setLoading(false)
    }, [transaction, metodePembayaran, products])

  return (
    <div style={{position:'relative', width:'100vw', overflowX:'hidden'}}>
      {
        openModal && <PaymentProof transactionId={transactionId} setOpenModal={setOpenModal} />
      }
      <div id='corner-gradient' />
      <div id='page-container'>
        {
          loading ? <h1>Loading...</h1> :
          <div id='payment-container'>
          <p id='header-payment'>Menunggu Pembayaran</p>
          <div className='payment-section-container d-flex justify-content-between align-items-center'>
            <div>
              <p className='payment-small-title'>Batas Akhir Pembayaran</p>
              <p className='payment-deadline'>Kamis, 21 Juli 2022, 20:45</p>
            </div>
            <div className='d-flex align-items-center'>
              <p className='payment-timer-number'>23</p>
              <p className='payment-timer-colon'>:</p>
              <p className='payment-timer-number'>38</p>
              <p className='payment-timer-colon'>:</p>
              <p className='payment-timer-number'>57</p>

            </div>
          </div>
          <div className='payment-section-container'>
          <p className='payment-section-header' style={{marginBottom:'15px'}}>Ringkasan Order</p>
              {
                showAllProducts ?
                products.map((product) => {
                  return <div style={{borderTop: '2px solid #D5D7DD'}} key={product.id}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <img className='gambar-produk-keranjang' src={`${API_URL}/${product.gambar}`}
                        onClick={() => navigate(`/productdetail/${product.id}`)} alt="" />
                      <div>
                        <p className='nama-produk-keranjang' onClick={() => navigate(`/productdetail/${product.id}`)}>{product.nama}</p>
                        <p className='quantity-produk-keranjang'>{`${product.quantity} ${product.satuan}`}</p>
                      </div>
                    </div>
                    <p className='harga-produk-keranjang'>{'Rp' + (product.harga * product.quantity).toLocaleString('de-DE', {minimumFractionDigits: 0})}</p>
                  </div>
                </div>
                }) : <div style={{borderTop: '2px solid #D5D7DD'}}>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    <img className='gambar-produk-keranjang' src={`${API_URL}/${products[0] && products[0].gambar}`}
                    onClick={() => navigate(`/productdetail/${products[0].id}`)} alt="" />
                    {
                      products.length > 1 ?
                      <div className='d-flex flex-column justify-content-between'>
                        <div>
                          <p className='nama-produk-keranjang' onClick={() => navigate(`/productdetail/${products[0].id}`)}>{products[0].nama}</p>
                          <p className='quantity-produk-keranjang'>{`${products[0].quantity} ${products[0].satuan}`}</p>
                        </div>
                          <p style={{color:'#E0004D', fontSize:'14px', cursor:'pointer', margin:'0px'}}
                          onClick={() => setShowAllProducts(true)}>
                            Tampilkan Detail</p>
                      </div> :
                      <div>
                        <p className='nama-produk-keranjang' onClick={() => navigate(`/productdetail/${products[0].id}`)}>{products[0].nama}</p>
                        <p className='quantity-produk-keranjang'>{`${products[0].quantity} ${products[0].satuan}`}</p>
                      </div>
                    }
                </div>
                <p className='harga-produk-keranjang'>{'Rp' + (products[0].harga * products[0].quantity).toLocaleString('de-DE', {minimumFractionDigits: 0})}</p>
              </div>
            </div>
              }
              <div className='d-flex justify-content-between' style={{borderTop: '2px solid #D5D7DD'}}>
                <p style={{margin:'20px 0px 0px 140px', color:'#213360'}}>Total Pembayaran</p>
                <p className='harga-produk-keranjang' style={{margin:'20px 0px 0px'}}>
                  {`Rp${transaction.totalPembayaran.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}
                </p>
              </div>
          </div>
          <div className='payment-section-container'>
              <div className='d-flex justify-content-between align-items-center pb-3' style={{borderBottom: '2px solid #D5D7DD'}}>
                <p className='payment-section-header'>{metodePembayaran.metode_pembayaran}</p>
                <img src={`${API_URL}/${metodePembayaran.logo}`} alt="" style={{height:'25px'}} />
              </div>
              {
                metodePembayaran.no_va ?
                <div>
                  <div className='mt-4 d-flex justify-content-between align-items-center'>
                    <div>
                      <p className='payment-small-title'>Nomor Virtual Account</p>
                      <p className='payment-method-numbers'>{metodePembayaran.no_va}</p>
                    </div>
                    <div className='d-flex align-items-center' style={{cursor:'pointer'}}>
                      <p className='payment-salin'>Salin</p>
                      <FontAwesomeIcon icon={faCopy} style={{marginLeft:'10px', fontSize:'24px', color:'#E0004D'}} />
                    </div>
                  </div>
                  <p className='payment-small-title mt-4'>Total Pembayaran</p>
                  <p className='payment-method-numbers'>
                  {`Rp${transaction.totalPembayaran.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}
                  </p>
                </div> :
                <div className='d-flex flex-column align-items-center'>
                  <img src={`${API_URL}/${metodePembayaran.qrcode}`} alt="" 
                    style={{height:'200px', marginTop:'15px'}}/>
                  <p className='payment-small-title mt-2'>Total Pembayaran</p>
                  <p className='payment-method-numbers'>
                  {`Rp${transaction.totalPembayaran.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}
                  </p>
                </div>
              }
          </div>
          <div className='d-flex justify-content-between mb-5'>
            <button className='button-red-outline' style={{width:'48%'}}>
              Kembali ke Beranda
            </button>
            <button className='button-red' style={{width:'48%'}} onClick={() => setOpenModal(true)}>
              Upload Bukti Pembayaran
            </button>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default Payment
