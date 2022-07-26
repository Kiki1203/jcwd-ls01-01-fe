import React from 'react';
import './ProductCardSmall.css'
import API_URL from "../../../Helpers/API_URL.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CartModal from '../CartModal/CartModal';
import VerifyModal from '../VerifyModal/VerifyModal';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function ProductCardSmall({product}) {
    const [openModal, setOpenModal] = useState(false)
    const [openModalVerify, setOpenModalVerify] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('myTkn')
    const verified = useSelector(state => state.user.isConfirmed)

    const addToCart = () => {
        axios.post(`${API_URL}/transaction/addtocart`,{
          productId: product.id,
          quantity: 1
        },{ headers: {authorization: token}})
        .then((res) => {
            setOpenModal(true)
            overflowYHidden()
        }).catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Okay!'
        })
        })
    }

    const onClickKeranjang = () => {
        if(verified === 1 && token) {addToCart()}
        if(verified === 0 && token) {setOpenModalVerify(true)}
        if(!token) {navigate('/login')}
    }

    const overflowYHidden = () => {
        let elems = document.getElementsByTagName('html');

        for (let i = 0; i < elems.length; i++) {
            elems[i].style.overflow = "hidden";
        }
    }

    return (
        <div>
            {
                openModal && <CartModal product={product} setOpenModal={setOpenModal} />
            }
            {
                openModalVerify && <VerifyModal setOpenModal={setOpenModalVerify} />
            }
            <div className='product-card-small' onClick={() => navigate(`/productdetail/${product.id}`)}>
                <div className='circle' onClick={(e) => e.stopPropagation()}>
                    <span className='product-card-heart'><FontAwesomeIcon icon={faHeart} /></span>
                </div>
                <div>
                    <img className='product-image' src={`${API_URL}/${product.gambar}`} alt="" />
                    <div className='product-card-detail'>
                        <p className='product-name-small'>{product.namaObat}</p>
                        <div className="d-flex align-items-center mt-1">
                            <div className="nominal-diskon-produk">10%</div>
                            <p className="harga-diskon-produk">{`Rp${product.harga.toLocaleString('de-DE', { minimumFractionDigits: 0})}`}</p>
                        </div>
                        <div style={{display:'flex'}}>
                            <span className='product-price-small'>Rp</span>
                            <span className='product-price-small'>{product.diskon.toLocaleString('de-DE', { minimumFractionDigits: 0})}</span>
                            <span className='product-unit-small'>/</span>
                            <span className='product-unit-small' style={{marginLeft:'2px'}}>{product.satuanObat}</span>
                        </div>
                    </div>
                </div>
                {
                    product.butuhResep === 'Ya'
                    ? <div className='butuh-resep' onClick={(e) => e.stopPropagation()}>
                        Butuh Resep
                    </div>
                    : <button className='keranjang' onClick={(e) => {
                        e.stopPropagation()
                        onClickKeranjang()
                    }}>
                        Keranjang
                    </button>
                }
            </div>
        </div>
    )
}

export default ProductCardSmall;