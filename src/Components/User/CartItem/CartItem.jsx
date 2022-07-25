import React, { useEffect, useState } from 'react';
import './CartItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from "../../../Helpers/API_URL.js"
import { useNavigate } from 'react-router-dom';

function CartItem({product, products, setProducts, objHargaAll, setObjHargaAll, objQtyAll, setObjQtyAll, selectAll, index}) {
    const [qty, setQty] = useState(product.quantity)
    const [selected, setSelected] = useState(product.selected)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [tooManyProducts, setTooManyProducts] = useState(false)
    const token = localStorage.getItem('myTkn')
    const navigate = useNavigate()

    useEffect(() => {
        setError(false)
        if(qty <= product.stok){
            setTooManyProducts(false)
            axios.patch(`${API_URL}/transaction/editquantity`,{
                productId: product.produkId,
                quantity: qty
            },{headers: {authorization: token}})
            .then(res => {
                let temp = products
                temp[index] = {...products[index], quantity:qty}
                setProducts(temp)
            })
            .catch(e => {
                setError(true)
                setErrorMsg(e.message)
            })
        }    
    }, [qty])

    useEffect(() => {
        setError(false)
        axios.patch(`${API_URL}/transaction/editselected`,{
            productId: product.produkId,
            selected: selected
        },{headers: {authorization: token}})
        .then(res => {
        })
        .catch(e => {
            setError(true)
            setErrorMsg(e.message)
        })
    }, [selected])

    useEffect(() => {
        let nama = product.namaObat
        nama = nama.replace(/[^A-Za-z]+/g, '')
        const harga = product.harga
        const diskon = product.diskon
        
        if(selected === 1){
            setObjQtyAll({...objQtyAll, [nama]: qty})
            diskon ? 
            setObjHargaAll({...objHargaAll, [nama]: {harga: qty * harga, diskon: qty * diskon}})
            : setObjHargaAll({...objHargaAll, [nama]: {harga: qty * harga, diskon: 0}})
        } else {
            setObjQtyAll({...objQtyAll, [nama]: 0})
            setObjHargaAll({...objHargaAll, [nama]: {harga: 0, diskon: 0}})
        }
        console.log(objHargaAll)
    }, [qty, selected])

    useEffect(() => {
        if(selectAll === true) setSelected(1) 
        if(selectAll === false) setSelected(0)
    }, [selectAll])

    const deleteFunc = () => {
        axios.delete(`${API_URL}/transaction/deleteproduct?produkId=${product.produkId}`,{headers: {authorization: token}})
        .then(res => {
            const index = products.findIndex(x => x.id === product.id)
            setProducts([...products.slice(0,index), ...products.slice(index+1, products.length)])
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                text: 'Barang berhasil dihapus dari keranjang.',
                timer: 5000,
                color: 'white',
                background: '#3A3B3C',
                backdrop: 'rgba(0,0,0,0)'
              })
        })
        .catch(e => {
            setError(true)
            setErrorMsg(e.message)
        })
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <input type="checkbox" checked={selected ? true : false} onClick={(event) => {
                        if(event.target.checked) {
                            setSelected(1)
                        } else {
                            setSelected(0)
                        }
                    }} />
                    <img className='gambar-produk-keranjang' src={`${API_URL}/${product.gambar}`}
                        onClick={() => navigate(`/productdetail/${product.produkId}`)} alt="" />
                    <div>
                        <p className='nama-produk-keranjang' onClick={() => navigate(`/productdetail/${product.produkId}`)}>{product.namaObat}</p>
                        <p className='quantity-produk-keranjang'>{`${qty} ${product.satuanObat}`}</p>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                {
                    product.diskon ? 
                    <p className='harga-diskon-keranjang'>{'Rp' + (product.harga * qty).toLocaleString('de-DE', {minimumFractionDigits: 0})}</p>
                    : ''
                }
                    <p className='harga-produk-keranjang'>{'Rp' + ((product.diskon ? product.diskon : product.harga) * qty).toLocaleString('de-DE', {minimumFractionDigits: 0})}</p>
                </div>
            </div>
            <div className='d-flex justify-content-end align-items-center' >
                <p className='pindahkan-ke-favorit'>Masukkan ke Favorit</p>
                <FontAwesomeIcon icon={faTrashCan} className='keranjang-buang' 
                onClick={() => deleteFunc()}/>
                <div className='d-flex align-items-center'>
                    <button id='qty-button-left-keranjang' disabled={qty === 1} onClick={() => setQty(qty - 1)}><FontAwesomeIcon icon={faMinus} className='qty-icon' /></button>
                    <input type="number" value={qty} id='qty-number-keranjang'
                    onChange={(e) => {
                        if(e.target.value.length !== 0){setQty(e.target.valueAsNumber)}
                        if(e.target.value > product.stok){
                            setTooManyProducts(true)
                            setQty(product.stok)
                        } else {setTooManyProducts(false)}
                    }} />
                    <button id='qty-button-right-keranjang' disabled={qty >= product.stok} onClick={() => setQty(qty + 1)}><FontAwesomeIcon icon={faPlus} className='qty-icon' /></button>
                </div>
            </div>
            {
                tooManyProducts && <div className='d-flex justify-content-end align-items-center'>
                    <p className='pindahkan-ke-favorit' style={{marginTop:'10px', paddingRight:'0px', borderRight:'none'}}>{`Maksimal ${product.stok} produk`}</p>
                </div>
            }
        </div>
    );
}

export default CartItem;