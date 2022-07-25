import React from 'react';
import './CartModal.css';
import API_URL from "../../../Helpers/API_URL.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function CartModal({product, setOpenModal}) {
    const navigate = useNavigate()
    
    const handleClose = () => {
        let elems = document.getElementsByTagName('html');

        for (let i = 0; i < elems.length; i++) {
            elems[i].removeAttribute('style');
        }
        setOpenModal(false)
    }
    
    return (
        <div className='modal-background fixed-top' onClick={() => handleClose()}>
            <div className='modal-container' onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon icon={faXmark} className='close-icon' onClick={() => handleClose()} />
                <p className='berhasil-ditambahkan'>Produk Berhasil Ditambahkan!</p>
                <div className='cart-row'>
                    <div className='d-flex align-items-center'>
                        <img className='cart-image' src={`${API_URL}/${product.gambar}`} alt="" />
                        <p className='cart-name'>{product.namaObat}</p>
                    </div>
                    <button className='lihat-keranjang' onClick={() => {
                        navigate('/cart')
                        handleClose()
                    }}>Lihat Keranjang</button>
                </div>
            </div>
        </div>
    )
}

export default CartModal;