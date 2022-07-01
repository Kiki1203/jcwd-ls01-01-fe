import React from 'react';
import './Cart.css';
import Footer from '../../../Components/User/Footer/Footer.jsx';
import CartItem from '../../../Components/User/CartItem/CartItem.jsx';
import ProductCardSmall from '../../../Components/User/ProductCardSmall/ProductCardSmall.jsx';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Cart(props) {
  const [products, setProducts] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [totalHarga, setTotalHarga] = useState({})
  const [totalQuantity, setTotalQuantity] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const token = localStorage.getItem('myTkn')

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios.get(`${API_URL}/transaction/getcart`, {headers: {authorization: token}})
    .then(res => {
      setProducts([...res.data])
      setLoading(false)
      console.log(products)
    })
    .catch(e => {
      setLoading(false)
      setError(true)
      setErrorMsg(e.message)
    })
  }, [])

  useEffect(() => {
    setError(false)
    if(products.length !== 0){
      axios.get(`${API_URL}/product/relatedproducts?id=${products[0].produkId}&keluhanid=${products[0].keluhanId}&golonganobatid=${products[0].golonganObatId}`,
      {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        setRelatedProducts([...res.data])
        console.log('related products: ' + relatedProducts)
      })
      .catch(e => {
        setError(true)
        setErrorMsg(e.message)
      })
    }
  }, [products])

  const totalHargaFunc = () => {
    let arrayHarga = Object.values(totalHarga)
    let total = 0
    arrayHarga.forEach(harga => {
      total += harga
    })
    return total
  }
  
  const totalQuantityFunc = () => {
    let arrayQty = Object.values(totalQuantity)
    let total = 0
    arrayQty.forEach(qty => {
      total += qty
    })
    return total
  }

  return (
    <div style={{position:'relative', width:'100vw', overflowX:'hidden'}}>
    <div id='corner-gradient' />
    <div id='page-container'>
      {
        loading ?
        <h1>Loading...</h1>
        : <div style={{minWidth:'1100px'}}>
          <p id='keranjang-saya' style={{marginTop:'0px'}}>Keranjang Saya</p> 
          <div className='d-flex justify-content-between'>
            <div id='produk-keranjang-container'>
              <label className='sidebar-checkbox mb-3'>
                  <input type="checkbox" />
                  Pilih Semua
              </label>
              {
                products.map((product, index) => {
                  return <div className='produk-keranjang' key={product.produkId}>
                    <CartItem product={product}
                              totalHarga={totalHarga}
                              setTotalHarga={setTotalHarga}
                              totalQuantity={totalQuantity}
                              setTotalQuantity={setTotalQuantity} />
                  </div>
                })
              }
            </div>
            <div id='tab-total'>
              <p id='ringkasan-belanja'>Ringkasan Belanja</p>
              <div className='d-flex justify-content-between'>
                <p className='detail-ringkasan'>{`Total harga (${totalQuantityFunc()} produk)`}</p>
                <p className='detail-ringkasan'><b>{`Rp${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</b></p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='detail-ringkasan'>Total diskon produk</p>
                <p className='detail-ringkasan'><b>-Rp0</b></p>
              </div>
              <div className='d-flex justify-content-between total-harga-container'>
                <p className='total-harga'>Total harga</p>
                <p className='total-harga'>{`Rp${totalHargaFunc().toLocaleString('de-DE', {minimumFractionDigits: 0})}`}</p>
              </div>
              <button className='button-bayar' disabled={totalQuantity === 0}>{`Beli (${totalQuantityFunc()})`}</button>
            </div>
          </div>
          <div style={{marginTop:'70px', borderTop:'2px solid #D5D7DD'}}>
            <p id='produk-terkait'>Produk Terkait</p>
            <div className='d-flex justify-content-between'>
              {
                relatedProducts.map((product, index) => {
                  return <div key={product.id}>
                    <ProductCardSmall product={product} />
                  </div>
                })
              }
            </div>
          </div>
        </div>
      }
    </div>
    <Footer />
  </div>
  )
}

export default Cart
