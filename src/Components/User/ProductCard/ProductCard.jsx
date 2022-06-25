import React from 'react';
import './ProductCard.css'
import API_URL from "../../../Helpers/API_URL.js"

function ProductCard({product}) {
    return (
        <div className='product-card'>
            <div className='circle'>
                <span style={{fontSize:'30px', color:'#B4B9C7', marginTop:'5px'}}>❤</span>
            </div>
            <div>
                <img className='product-image' src={`${API_URL}/${product.gambar}`} alt="" />
                <p className='product-name'>{product.namaObat}</p>
                <div style={{display:'flex'}}>
                    <span className='product-price'>Rp</span>
                <span className='product-price'>{product.harga.toLocaleString('de-DE', { minimumFractionDigits: 0})}</span>
                    <span className='product-unit'>/</span>
                    <span className='product-unit' style={{marginLeft:'2px'}}>{product.satuanObat}</span>
                </div>
            </div>
            <button className='keranjang'>
                Keranjang
            </button>
        </div>
    );
}

export default ProductCard;