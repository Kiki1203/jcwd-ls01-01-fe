import React, {useState, useEffect} from 'react';
import './Checkout.css';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import PaymentMethod from '../../../Components/User/PaymentMethod/PaymentMethod.jsx';
import ChangeAddress from '../../../Components/User/ChangeAddress/ChangeAddress.jsx';

const Checkout = () => {
  const [products, setProducts] = useState([])
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState({})
  const [selectedKurir, setSelectedKurir] = useState(null)
  const [selectedPaymentMtd, setSelectedPaymentMtd] = useState(null)
  const [kurirOpen, setKurirOpen] = useState(false)
  const [openMdlAlamat, setOpenMdlAlamat] = useState(true)
  const [openMdlPembayaran, setOpenMdlPembayaran] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const token = localStorage.getItem('myTkn')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios.get(`${API_URL}/transaction/getcheckoutdata`, {headers: {authorization: token}})
    .then(res => {
      setLoading(false)
      setProducts([...res.data.products])
      setAddresses([...res.data.alamat])
      setSelectedAddress(res.data.alamat.find(item => item.alamat_utama === 1))
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setErrorMsg(e.message)
    })
  }, [])
  
  const totalHargaFunc = () => {
    let total = 0
    products.forEach(p => {
      total += p.harga
    })
    return total
  }
  
  const totalQtyFunc = () => {
    let total = 0
    products.forEach(p => {
      total += p.quantity
    })
    return total
  }

  // nanti direplace dengan data dari rajaongkir
  const placeholderKurir = [
    {nama: 'JNE OKE', etd: '4-5', tarif: 10000},
    {nama: 'JNE REG', etd: '2-3', tarif: 15000},
    {nama: 'JNE YES', etd: '1', tarif: 20000},
    {nama: 'POS Paket Kilat Khusus', etd: '3', tarif: 12000},
    {nama: 'TIKI ECO', etd: '4', tarif: 9000},
    {nama: 'TIKI REG', etd: '2', tarif: 18000},
    {nama: 'TIKI ONS', etd: '1', tarif: 27000}
  ]
  return (
    <div style={{position:'relative', width:'100vw', overflowX:'hidden'}}>
    <div id='corner-gradient' />
    {
      openMdlPembayaran && <PaymentMethod total={totalHargaFunc() + selectedKurir.tarif}
                            setOpenModal={setOpenMdlPembayaran}
                            selected={selectedPaymentMtd}
                            setSelected={setSelectedPaymentMtd} />
    }
    {
      openMdlAlamat && <ChangeAddress addresses={addresses}
                        setOpenModal={setOpenMdlAlamat}
                        selected={selectedAddress}
                        setSelected={setSelectedAddress}
                        setSelectedKurir={setSelectedKurir} />
    }
    <div id='page-container'>
      {
        loading ?
        <h1>Loading...</h1>
        : <div className='d-flex justify-content-between' style={{minWidth:'1100px'}}>
          <div>
            <div className='produk-keranjang-container'>
              <p style={{fontSize:'20px', fontWeight:'700', color:'#213360'}}>Alamat Pengiriman</p>
              <div style={{padding:'20px 0px', borderTop: '2px solid #D5D7DD', borderBottom: '2px solid #D5D7DD'}}>
                <div className='d-flex justify-content-between'>
                  <p style={{fontSize:'14px', fontWeight:'700', color:'#213360'}}>{`${selectedAddress.nama_depan_penerima} ${selectedAddress.nama_belakang_penerima}, ${selectedAddress.no_hp}`}</p>
                  <p style={{fontSize:'14px', fontWeight:'700', color:'#E0004D', cursor:'pointer'}}
                    onClick={() => setOpenMdlAlamat(true)}>Pilih Alamat Lain</p>
                </div>
                <p style={{fontSize:'14px', color:'#213360', margin:'0px'}}>{selectedAddress.label_alamat}</p>
                <p style={{fontSize:'14px', color:'#4F618E', margin:'0px 100px 0px 0px'}}>{`${selectedAddress.alamat}, ${selectedAddress.kecamatan}, ${selectedAddress.kabupaten_kota}, ${selectedAddress.provinsi}, ${selectedAddress.kode_pos}`}</p>
              </div>
              <p style={{fontSize:'14px', fontWeight:'700', color:'#213360', marginTop:'20px', marginBottom:'0px'}}>Pilih jasa pengiriman:</p>
              <div style={{position:'relative'}}>
                <div className="custom-select" style={{borderRadius: kurirOpen && '10px 10px 0px 0px'}} onClick={() => setKurirOpen(!kurirOpen)}>
                  {selectedKurir ? selectedKurir.nama : 'Pengiriman'}
                  <FontAwesomeIcon icon={faAngleDown} style={{position:'absolute', top:'12px', right:'20px'}} />
                </div>
                <div className={`options-container`} style={{display:!kurirOpen && 'none'}}>
                  {
                    placeholderKurir.map(kurir => {
                      return <div className='kurir-option' onClick={() => {
                        setSelectedKurir(kurir)
                        setKurirOpen(false)}}>
                        <div>
                          <p className='kurir-nama'>{kurir.nama}</p>
                          <p className='kurir-etd'>{`Estimasi tiba dalam ${kurir.etd} hari`}</p>
                        </div>
                        <p className='kurir-tarif'>{`Rp${kurir.tarif.toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
            <div className='produk-keranjang-container'>
              <p style={{fontSize:'20px', fontWeight:'700', color:'#213360'}}>Ringkasan Order</p>
              {
                products.map((product) => {
                  return <div style={{borderTop: '2px solid #D5D7DD'}} key={product.produkId}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <img className='gambar-produk-keranjang' src={`${API_URL}/${product.gambar}`}
                        onClick={() => navigate(`/productdetail/${product.produkId}`)} alt="" />
                      <div>
                        <p className='nama-produk-keranjang' onClick={() => navigate(`/productdetail/${product.produkId}`)}>{product.namaObat}</p>
                        <p className='quantity-produk-keranjang'>{`${product.quantity} ${product.satuanObat}`}</p>
                      </div>
                    </div>
                    <p className='harga-produk-keranjang'>{'Rp' + (product.harga * product.quantity).toLocaleString('de-DE', {minimumFractionDigits: 0})}</p>
                  </div>
                </div>
                })
              }
              <div className='d-flex justify-content-between' style={{borderTop: '2px solid #D5D7DD'}}>
                <p style={{margin:'20px 0px 0px 140px', color:'#213360'}}>Subtotal</p>
                <p className='harga-produk-keranjang' style={{margin:'20px 0px 0px'}}>
                  {`Rp${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
              </div>
              </div>
            </div>
            <div id='tab-total' style={{height:'380px'}}>
              <p className='header-total' style={{marginBottom:'20px'}}>Ringkasan Belanja</p>
              <div className='d-flex justify-content-between'>
                <p className='detail-ringkasan'>{`Subtotal (${totalQtyFunc()} Produk)`}</p>
                <p className='detail-ringkasan'><b>{`Rp${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</b></p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='detail-ringkasan'>Biaya Pengiriman</p>
                <p className='detail-ringkasan'><b>{`Rp${selectedKurir ? selectedKurir.tarif.toLocaleString('de-DE', {minimumFractionDigits: 0}) : 0}`}</b></p>
              </div>
              <div className='total-harga-container-checkout'>
                <p className='total-harga'>Total</p>
                <p className='total-harga' style={{color:'#E0004D'}}>{`Rp${(totalHargaFunc() + (selectedKurir ? selectedKurir.tarif : 0)).toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
              </div>
              <p className='header-total' >Metode Pembayaran</p>
              <p style={{fontSize:'12px', color:'#4F618E', margin:'0px'}}>Silakan pilih metode pembayaran Anda di sini</p>
              <button className='button-bayar' disabled={selectedKurir === null} style={{marginTop:'20px', fontSize:'14px', padding:'15px'}}
              onClick={() => setOpenMdlPembayaran(true)}>
                {`Pilih Metode Pembayaran`}</button>
            </div>
          </div>
      }
    </div>
  </div>
  );
};

export default Checkout;
