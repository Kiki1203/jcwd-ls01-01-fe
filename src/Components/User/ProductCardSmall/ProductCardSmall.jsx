import React from 'react';
import './ProductCardSmall.css'
import API_URL from "../../../Helpers/API_URL.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CartModal from '../CartModal/CartModal';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

function ProductCardSmall({product}) {
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('myTkn')

    const addToCart = () => {
        axios.post(`${API_URL}/transaction/addtocart`,{
          productId: product.id,
          quantity: 1
        },{ headers: {authorization: token}})
        .then((res) => {
            setOpenModal(true)
        }).catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Okay!'
        })
        })
    }

    return (
        <div>
            {
                openModal && <CartModal product={product} setOpenModal={setOpenModal} />
            }
            <div className='product-card-small' onClick={() => navigate(`/productdetail/${product.id}`)}>
                <div className='circle' onClick={(e) => e.stopPropagation()}>
                    <span style={{fontSize:'30px', color:'#B4B9C7', marginTop:'5px'}}><FontAwesomeIcon icon={faHeart} /></span>
                </div>
                <div>
                    <img className='product-image' src={`${API_URL}/${product.gambar}`} alt="" />
                    <p className='product-name-small'>{product.namaObat}</p>
                    <div style={{display:'flex'}}>
                        <span className='product-price-small'>Rp</span>
                    <span className='product-price-small'>{product.harga.toLocaleString('de-DE', { minimumFractionDigits: 0})}</span>
                        <span className='product-unit-small'>/</span>
                        <span className='product-unit-small' style={{marginLeft:'2px'}}>{product.satuanObat}</span>
                    </div>
                </div>
                {
                    product.butuhResep === 'Ya'
                    ? <button className='keranjang' onClick={(e) => e.stopPropagation()}>
                        Butuh Resep
                    </button>
                    : <button className='keranjang' onClick={(e) => {
                        e.stopPropagation()
                        addToCart()
                    }}>
                        Keranjang
                    </button>
                }
            </div>
        </div>
    )
}

export default ProductCardSmall;