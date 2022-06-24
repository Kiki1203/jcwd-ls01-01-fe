import React from 'react';
import './ProductCard.css'

function ProductCard(props) {
    return (
        <div className='product-card'>
            <div className='circle'>
                <span style={{fontSize:'30px', color:'#B4B9C7', marginTop:'5px'}}>❤</span>
            </div>
            <img className='product-image' src="https://cf.shopee.co.id/file/63e3ed257b16bb779a8db7958768a891" alt="" />
            <p className='product-name'>Decolgen 4 Tablet</p>
            <div style={{display:'flex'}}>
                <span className='product-price'>Rp</span>
                <span className='product-price'>1.900</span>
                <span className='product-unit'>/</span>
                <span className='product-unit' style={{marginLeft:'2px'}}>strip</span>
            </div>
            <button className='keranjang'>
                Keranjang
            </button>
        </div>
    );
}

export default ProductCard;