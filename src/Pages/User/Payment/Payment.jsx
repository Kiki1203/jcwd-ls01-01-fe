import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Payment.css';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PaymentProof from '../../../Components/User/PaymentProof/PaymentProof';
import useCountdown from '../../../../src/Helpers/useCountdown';
import { RingLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Payment = () => {
    const [transaction, setTransaction] = useState({})
    const [formattedDate, setFormattedDate] = useState('')
    const [metodePembayaran, setMetodePembayaran] = useState({})
    const [products, setproducts] = useState([])
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const params = useParams()
    const transactionId = params.id
    const token = localStorage.getItem('myTkn')
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const endTime = new Date().getTime() + (3600000 * 24);
    const [timeLeft, setEndTime] = useCountdown(endTime);
      const hours = Math.floor(timeLeft / 3600000);
      const minutes = Math.floor(timeLeft / 60000) % 60;
      const seconds = Math.floor(timeLeft / 1000) % 60;
      const verified = useSelector(state => state.user.isConfirmed)
      useEffect(() => {
        setLoading(true)
        if (!token) {
          navigate('/');
        } else if (verified === 0){
          navigate('/verification')
        }
        setError(false)
        
      }, [])

    useEffect(() => {
      setLoading(true)
      axios.get(`${API_URL}/transaction/getpaymentdetails?transactionid=${transactionId}`, {headers: {authorization: token}})
      .then(res => {
        setTransaction(res.data.transaction)
        setMetodePembayaran(res.data.metodePembayaran)
        setproducts(res.data.products)
        let date = new Date(res.data.transaction.createdAt)
        date.setHours(date.getHours() + 24)
        setEndTime(date.getTime())
      })
      .catch(e => {
        console.log('masuk error payment', e)
        setLoading(false)
      })
    }, [])

    useEffect(() => {
      let date = new Date()
      console.log('waktu_ganti_transaksi', transaction.waktu_ganti_status)
      if(transaction.waktu_ganti_status){
        date = new Date(transaction.waktu_ganti_status)
      } else if(transaction.createdAt){
        date = new Date(transaction.createdAt)
      }
      if(transaction.waktu_ganti_status || transaction.createdAt){
        date.setHours(date.getHours() + 7 + 24)
        date = date.toISOString()
        let formatted = date.substr(8,1) == 0 ? date.substr(9,1) : date.substr(8,2)
        formatted += ' '
        formatted += date.substr(5,2) == '01' ? 'Jan' :
        date.substr(5,2) == '02' ? 'Feb' :
        date.substr(5,2) == '03' ? 'Mar' :
        date.substr(5,2) == '04' ? 'Apr' :
        date.substr(5,2) == '05' ? 'Mei' :
        date.substr(5,2) == '06' ? 'Jun' :
        date.substr(5,2) == '07' ? 'Jul' :
        date.substr(5,2) == '08' ? 'Agu' :       
        date.substr(5,2) == '09' ? 'Sep' :
        date.substr(5,2) == '10' ? 'Okt' :
        date.substr(5,2) == '11' ? 'Nov' :
        'Des'
        formatted += ` ${date.substr(0,4)}, ${date.substr(11,5)} WIB`
        setFormattedDate(formatted)
      } 
  }, [transaction])

    useEffect(() => {
      if(transaction.totalPembayaran && metodePembayaran.id && products.length) setLoading(false)
    }, [transaction, metodePembayaran, products])

    const copy = () => {
      const el = document.createElement('input');
      el.value = metodePembayaran.no_va
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        text: 'No. VA berhasil disalin!',
        timer: 5000,
        color: 'white',
        background: '#3A3B3C',
        backdrop: 'rgba(0,0,0,0)'
      })
  }

  return (
    <div style={{position:'relative', width:'100vw', overflowX:'hidden'}}>
      {
        openModal && <PaymentProof transactionId={transactionId} setOpenModal={setOpenModal} />
      }
      <div id='corner-gradient' />
      <div id='page-container'>
        {
          loading ? <div className="d-flex justify-content-center align-items-center"
                    style={{height:'500px'}}>
                    <RingLoader color={'#E0004D'} size={150} /> </div> :
          <div id='payment-container'>
          <p id='header-payment'>Menunggu Pembayaran</p>
          <div className='payment-section-container d-flex justify-content-between align-items-center'>
            <div>
              <p className='payment-small-title'>Batas Akhir Pembayaran</p>
              <p className='payment-deadline'>{formattedDate}</p>
            </div>
            <div className='d-flex align-items-center'>
              <p className='payment-timer-number'>{hours}</p>
              <p className='payment-timer-colon'>:</p>
              <p className='payment-timer-number'>{minutes}</p>
              <p className='payment-timer-colon'>:</p>
              <p className='payment-timer-number'>{seconds}</p>

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
                    <div className='d-flex align-items-center' style={{cursor:'pointer'}}
                      onClick={copy}>
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
          <hr />
            <p id='header-payment' style={{margin:'30px 0px 20px'}}>Cara Pembayaran</p>
            <div className='cara-pembayaran-desc-container'>
            {
              metodePembayaran.cara_bayar_desc.split(',').map((c, i) => {
                return <div className='d-flex'>
                  <div className='cara-pembayaran-no'>{`${i + 1}.`}</div>
                  <div className='cara-pembayaran-desc'>{c}</div>

                </div>
              })
            }
          </div>

        </div>
        }
      </div>
    </div>
  )
}

export default Payment
