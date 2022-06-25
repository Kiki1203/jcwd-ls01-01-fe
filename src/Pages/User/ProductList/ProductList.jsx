import React from 'react';
import './ProductList.css'
import ProductCard from '../../../Components/User/ProductCard/ProductCard';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ProductList(props) {
    const [numProducts, setNumProducts] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [sortBy, setSortBy] = useState('AZ')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/product/totalproductsnum`, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(res => {
        setNumProducts(res.data[0].countProducts)
        setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setError(true)
            setErrorMsg(e.message)
        })
    }, [])

    useEffect(() => {
        setProducts([])
        setLoading(true)
        setError(false)
        axios.get(`${API_URL}/product/productcards?page=${pageNumber}&limit=16&sortby=${sortBy}`, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(res => {
        setProducts(prev => {
            return [...prev, ...res.data.map(product => ({
                id: product.id,
                namaObat: product.namaObat,
                butuhResep: product.butuhResep,
                harga: product.harga,
                gambar: product.gambar,
                stok: product.stok,
                satuanObat: product.satuanObat
            }))]})
        setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setError(true)
            setErrorMsg(e.message)
        })
    }, [pageNumber, sortBy])

    let paginationButtonGenerator = () => {
        let paginationButtons = []
        for(let i=1; i<=Math.ceil(numProducts/16); i++) {
            paginationButtons.push(<button
            className={`btn ${pageNumber == i ? 'btn-danger' : 'btn-outline-danger'}`}
            style={{marginRight: '5px', marginLeft: '5px'}}
            onClick={() => setPageNumber(i)}>{i}</button>)
        }
        return paginationButtons.map(value => {
            return value
        })
    }

    return (
        <div id='page-container'>
            <div id='sidebar'>
                <div id='kategori'>
                    <div>
                        <p className='sidebar-title'>KATEGORI</p>
                    </div>
                    <p className='sidebar-text'>Obat-obatan</p>
                    <p className='sidebar-text'>Nutrisi</p>
                    <p className='sidebar-text'>Herbal</p>
                    <p className='sidebar-text'>Vitamin & Suplemen</p>
                    <p className='sidebar-text'>Alat Kesehatan</p>
                    <p className='sidebar-text'>Perawatan Tubuh</p>
                    <p className='sidebar-text'>Ibu & Anak</p>
                </div>
                <div id='filter'>
                    <button id='hapus-semua-filter'>
                        Hapus semua filter
                    </button>
                <hr className='separator'/>
                    <div>
                        <p className='sidebar-title'>KELUHAN</p>
                    </div>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Batuk & flu
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Mulut & tenggorokan
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Imun booster
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Maag
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Diare
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Demam & sakit kepala
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Diabetes
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Kolesterol
                    </label>
                    <p className='lihat-lebih-lengkap'>Lihat lebih lengkap</p>
                <hr className='separator'/>
                    <div>
                        <p className='sidebar-title'>HARGA</p>
                    </div>
                    <div className='input-box-container' style={{margin:'5px 0px 10px'}}>
                        <input type="number" className='input-box' placeholder='Harga minimum' />
                        <span className='rp'>Rp</span>
                    </div>
                    <div className='input-box-container' style={{marginBottom:'7px'}}>
                        <input type="number" className='input-box' placeholder='Harga maksimum' />
                        <span className='rp'>Rp</span>
                    </div>

                <hr className='separator'/>
                    <div>
                        <p className='sidebar-title'>JENIS OBAT</p>
                    </div>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Kapsul
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Sirup
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Drops
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Tablet
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Salep
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Obat kumur
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Gel
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Spray
                    </label>
                    <p className='lihat-lebih-lengkap'>Lihat lebih lengkap</p>
                   
                <hr className='separator'/>
                    <div>
                        <p className='sidebar-title'>GOLONGAN OBAT</p>
                    </div>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Obat bebas
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Obat bebas terbatas
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Obat keras
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" />
                        Lain-lain
                    </label>
                </div>
            </div>
            <div id='products'>
                <p style={{fontSize:'24px', fontWeight:'700'}}>Semua Kategori</p>
                <hr style={{borderColor:'#B4B9C7', borderWidth:'2px'}} />
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <p style={{fontSize:'14px', color:'#737A8D', margin:'0px'}}>{`${numProducts} produk di semua kategori`}</p>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <p style={{fontSize:'14px', color:'#737A8D', margin:'0px'}}>Urutkan</p>
                        <div class="custom-select">
                            <select>
                                <option onClick={() => setSortBy('AZ')}>Nama produk (A-Z)</option>
                                <option onClick={() => setSortBy('ZA')}>Nama produk (Z-A)</option>
                                <option onClick={() => setSortBy('hargaTerendah')}>Harga terendah</option>
                                <option onClick={() => setSortBy('hargaTertinggi')}>Harga tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id='product-cards-container'>
                    {
                        products.map((product, index) => {
                            return <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        })
                    }
                </div>
                <div className='d-flex justify-content-end'>
                    {paginationButtonGenerator()}
                </div>
            </div>
        </div>
    );
}

export default ProductList;