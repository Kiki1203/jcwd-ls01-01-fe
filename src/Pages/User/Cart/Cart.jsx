import React from 'react';
import './Cart.css';
import CartItem from '../../../Components/User/CartItem/CartItem.jsx';
import ProductCardSmall from '../../../Components/User/ProductCardSmall/ProductCardSmall.jsx';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import noProductIllust from './../../../Assets/no-product.svg';
import { RingLoader } from 'react-spinners';
import FooterMobile from '../../../Components/User/Footer/FooterMobile.jsx';
import NavbarMobile from '../../../Components/User/Navbar/NavbarMobile.jsx';
import Swal from 'sweetalert2';
import { PulseLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

function Cart(props) {
  const [products, setProducts] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [objHargaAll, setObjHargaAll] = useState({})
  const [objQtyAll, setObjQtyAll] = useState({})
  const [selectAll, setSelectAll] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const token = localStorage.getItem('myTkn')
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const verified = useSelector(state => state.user.isConfirmed)
  
  useEffect(() => {
    setLoading(true)
    if (!token) {
      navigate('/login');
    } else if (verified === 0){
      navigate('/verification')
    }
    setError(false)
    getCart()
  }, [])

  useEffect(() => {
    console.log('products', products)
    setError(false)
    if(products.length !== 0){
      axios.get(`${API_URL}/product/relatedproducts?id=${products[0].produkId}&keluhanid=${products[0].keluhanId}&golonganobatid=${products[0].golonganObatId}`,
      {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        setRelatedProducts([...res.data])
      })
      .catch(e => {
        setError(true)
        setErrorMsg(e.message)
      })
    }
    let newObjQtyAll = {}
    let newObjHargaAll = {}
    products.forEach(p => {
        if(p.selected === 1){
          newObjQtyAll[p.namaObat.replace(/[^A-Za-z]+/g, '')] = p.quantity
          p.diskon ?
          newObjHargaAll[p.namaObat.replace(/[^A-Za-z]+/g, '')] = {harga: p.harga * p.quantity, diskon: p.diskon * p.quantity}
          : newObjHargaAll[p.namaObat.replace(/[^A-Za-z]+/g, '')] = {harga: p.harga * p.quantity, diskon: 0}
        } else {
          newObjQtyAll[p.namaObat.replace(/[^A-Za-z]+/g, '')] = 0
          newObjHargaAll[p.namaObat.replace(/[^A-Za-z]+/g, '')] = {harga: 0, diskon: 0}
        }
    })
    setObjQtyAll(newObjQtyAll)
    setObjHargaAll(newObjHargaAll)
  }, [products])

  const getCart = async () => {
    await axios.get(`${API_URL}/transaction/getcart`, {headers: {authorization: token}})
    .then(res => {
      setLoading(false)
      setProducts([...res.data])
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setErrorMsg(e.message)
    })
  }

  const totalHargaFunc = () => {
    let arrayHarga = Object.values(objHargaAll)
    let total = 0
    arrayHarga.forEach(harga => {
      total += harga.harga
    })
    return total
  }

  const totalDiskonFunc = () => {
    let arrayHarga = Object.values(objHargaAll)
    let total = 0
    arrayHarga.forEach(harga => {
      total += harga.diskon
    })
    return total
  }
  
  const totalQtyFunc = () => {
    let arrayQty = Object.values(objQtyAll)
    let total = 0
    arrayQty.forEach(qty => {
      total += qty
    })
    return total
  }

  const selectAllFunc = (selected) => {
    let productsId = products.map(p => p.produkId)
    console.log(productsId)
    let checkMark
    selected ? checkMark = 1 : checkMark = 0 
    axios.patch(`${API_URL}/transaction/selectall`,{
      productsId: productsId,
      checkMark: checkMark
    },{headers: {authorization: token}})
    .then(res => {
      if(selected){
        setSelectAll(true)
        setProducts(prev => prev.map(p => p.selected === 0 ? { ...p, selected: 1 } : p))
      } else {
        setSelectAll(false)
        setProducts(prev => prev.map(p => p.selected === 1 ? { ...p, selected: 0 } : p))
      }
    })
    .catch(e => {
        setError(true)
        setErrorMsg(e.message)
    })
  }

  const getAddress = async () => {
    setSubmitLoading(true)
    await axios.get(`${API_URL}/user/getaddress`, {headers: {authorization: token}})
    .then(res => {
      setSubmitLoading(false)
      if(res.data.length > 0){
        navigate('/checkout/produk-bebas')
      } else {
        navigate('/formaddress', { state: { previousPath: pathname } })
      }
    })
    .catch(e => {
      setSubmitLoading(false)
      Swal.fire({
        title: 'Error!',
        text: e.message,
        icon: 'error',
        confirmButtonText: 'Oke',
        confirmButtonColor: '#E0004D'
    })
      setError(true)
      setErrorMsg(e.message)
    })
  }

  return (
    <div style={{position:'relative', width:'100vw', overflowX:'hidden'}}>
    <div id='corner-gradient' />
    <NavbarMobile />
    <div id='page-container'>
      {
        loading ?
        <div className="d-flex justify-content-center align-items-center" style={{height:'calc(100vh - 92px)'}}>
          <RingLoader color={'#E0004D'} size={150} /> </div>
        : products.length === 0 ?
        <div className='d-flex flex-column align-items-center justify-content-center' style={{width:'100%', height:'calc(100vh - 192px'}}>
            <img src={noProductIllust} alt="" style={{width:'250px', margin:'20px'}} />
            <p style={{color:'#213360', fontSize:'20px', fontWeight:'700', margin:'0px 0px 10px'}}>Oops, keranjang Anda masih kosong</p>
            <p style={{color:'#8f939e', fontSize:'14px', margin:'0px 0px 30px'}}>Yuk mulai isi keranjang Anda!</p>
            <button className='button-konfirmasi-pembayaran' onClick={() => navigate('/kategori/semua-kategori')}>Mulai Belanja</button>
        </div>
        : <div style={{minWidth:'1100px'}}>
          <p id='keranjang-saya' style={{marginTop:'0px'}}>Keranjang Saya</p> 
          <div className='d-flex justify-content-between'>
            <div className='produk-keranjang-container'>
              <label className='sidebar-checkbox mb-3'>
                  <input type="checkbox" onChange={(event) => {
                    selectAllFunc(event.target.checked)}} />
                  Pilih Semua
              </label>
              {
                products.map((product, index) => {
                  return <div className='produk-keranjang'>
                    <CartItem key={product.produkId}
                              product={product}
                              products={products}
                              setProducts={setProducts}
                              objHargaAll={objHargaAll}
                              setObjHargaAll={setObjHargaAll}
                              objQtyAll={objQtyAll}
                              setObjQtyAll={setObjQtyAll}
                              selectAll={selectAll}
                              index={index} />
                  </div>
                })
              }
            </div>
            <div id='tab-total'>
              <p id='ringkasan-belanja'>Ringkasan Belanja</p>
              <div className='d-flex justify-content-between'>
                <p className='detail-ringkasan'>{`Total harga (${totalQtyFunc()} produk)`}</p>
                <p className='detail-ringkasan'><b>{`Rp${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</b></p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='detail-ringkasan'>Total diskon produk</p>
                <p className='detail-ringkasan'><b>{`-Rp${(totalHargaFunc() - totalDiskonFunc()).toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</b></p>
              </div>
              <div className='d-flex justify-content-between total-harga-container'>
                <p className='total-harga-cart'>Total harga</p>
                <p className='total-harga-cart'>{`Rp${(totalDiskonFunc() !== 0 ? totalDiskonFunc() : totalHargaFunc()).toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
              </div>
              <button className='button-bayar'
                disabled={totalQtyFunc() === 0}
                onClick={() => getAddress()}>
                {submitLoading ? <PulseLoader size={3} margin={3} color='#ffffff' /> : `Beli (${totalQtyFunc()})`}</button>
            </div>
          </div>
          <div style={{marginTop:'70px', borderTop:'2px solid #D5D7DD'}}>
            <p id='produk-terkait'>Produk Terkait</p>
            <div className='d-flex justify-content-between'>
              {
                relatedProducts.map((product, index) => {
                  return <ProductCardSmall key={product.id} product={product} />
                })
              }
            </div>
          </div>
        </div>
      }
    </div>
    <FooterMobile />
  </div>
  )
}

export default Cart
