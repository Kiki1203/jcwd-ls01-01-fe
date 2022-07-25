import React from 'react';
import './ProductList.css'
import ProductCardSmall from '../../../Components/User/ProductCardSmall/ProductCardSmall';
import axios from 'axios';
import API_URL from "../../../Helpers/API_URL.js"
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import noProductIllust from './../../../Assets/no-product.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function ProductList(props) {
    const [numProducts, setNumProducts] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [sortBy, setSortBy] = useState('AZ')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [products, setProducts] = useState([])
    const [keluhan, setKeluhan] = useState([])
    const [jenisObat, setJenisObat] = useState([])
    const [golonganObat, setGolonganObat] = useState([])
    const [headerKategori, setHeaderKategori] = useState('')
    let { kategori } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    let searchQuery = searchParams.get('search')
    const navigate = useNavigate()

    useEffect(() => {
        kategori === 'semua-kategori' && setHeaderKategori('Semua Kategori')
        kategori === 'obat-obatan' && setHeaderKategori('Obat-obatan')
        kategori === 'nutrisi' && setHeaderKategori('Nutrisi')
        kategori === 'herbal' && setHeaderKategori('Herbal')
        kategori === 'vitamin-suplemen' && setHeaderKategori('Vitamin & Suplemen')
        kategori === 'alat-kesehatan' && setHeaderKategori('Alat Kesehatan')
        kategori === 'perawatan-tubuh' && setHeaderKategori('Perawatan Tubuh')
        kategori === 'ibu-anak' && setHeaderKategori('Ibu & Anak')
    }, [kategori])

    useEffect(() => {
        setLoading(true)
        setPageNumber(1)
        let keluhanString = keluhan.join('-')
        if(!searchQuery) {searchQuery = ''}
        axios.get(`${API_URL}/product/totalproductsnum?search=${searchQuery}&category=${kategori}&keluhan=${keluhanString}`, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(res => {
        setNumProducts(res.data[0].countProducts)
        setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setError(true)
            setErrorMsg(e.message)
        })
    }, [kategori, keluhan, searchQuery])

    useEffect(() => {
        setProducts([])
        setLoading(true)
        setError(false)
        let keluhanString = keluhan.join('-')
        if(!searchQuery) {searchQuery = ''}
        axios.get(`${API_URL}/product/productcards?search=${searchQuery}&category=${kategori}&keluhan=${keluhanString}&page=${pageNumber}&limit=12&sortby=${sortBy}`,
        {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(res => {
        setProducts(prev => {
            return [...prev, ...res.data.map(product => ({
                id: product.id,
                namaObat: product.namaObat,
                butuhResep: product.butuhResep,
                harga: product.harga,
                diskon: product.diskon,
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
    }, [pageNumber, sortBy, kategori, keluhan, searchQuery])

    let paginationButtonGenerator = () => {
        let paginationButtons = []
        for(let i=1; i<=Math.ceil(numProducts/12); i++) {
            paginationButtons.push(<button
            className={`btn ${pageNumber == i ? 'btn-danger' : 'btn-outline-danger'}`}
            style={{marginRight: '5px', marginLeft: '5px'}}
            onClick={() => setPageNumber(i)}>{i}</button>)
        }
        if(paginationButtons.length === 1) return
        return paginationButtons.map(value => {
            return value
        })
    }

    let keluhanFunc = (event, id) => {
        if(event.target.checked) {
            setKeluhan([...keluhan, id])
        } else {
            if(keluhan.includes(id)){
                setKeluhan((keluhan) => keluhan.filter((val) => val !== id))
            }
        }
    }

    return (
        <div id='page-container' style={{padding:'50px 0px'}}>
            <div id='sidebar'>
                <div id='kategori'>
                    <div>
                        <p className='sidebar-title'>KATEGORI</p>
                    </div>
                    <p className='sidebar-text' onClick={ () => searchQuery ? navigate('/kategori/semua-kategori?search=' + searchQuery)
        : navigate('/kategori/semua-kategori')}>Semua kategori</p>
                    <p className='sidebar-text'  onClick={ () => searchQuery ? navigate('/kategori/obat-obatan?search=' + searchQuery)
        : navigate('/kategori/obat-obatan')}>Obat-obatan</p>
                    <p className='sidebar-text' onClick={() => searchQuery ? navigate('/kategori/nutrisi?search=' + searchQuery)
        : navigate('/kategori/nutrisi')}>Nutrisi</p>
                    <p className='sidebar-text' onClick={() => searchQuery ? navigate('/kategori/herbal?search=' + searchQuery)
        : navigate('/kategori/herbal')}>Herbal</p>
                    <p className='sidebar-text' onClick={() => searchQuery ? navigate('/kategori/vitamin-suplemen?search=' + searchQuery)
        : navigate('/kategori/vitamin-suplemen')}>Vitamin & Suplemen</p>
                    <p className='sidebar-text' onClick={() => searchQuery ? navigate('/kategori/alat-kesehatan?search=' + searchQuery)
        : navigate('/kategori/alat-kesehatan')}>Alat Kesehatan</p>
                    <p className='sidebar-text' onClick={() => searchQuery ? navigate('/kategori/perawatan-tubuh?search=' + searchQuery)
        : navigate('/kategori/perawatan-tubuh')}>Perawatan Tubuh</p>
                    <p className='sidebar-text' onClick={() => searchQuery ? navigate('/kategori/ibu-anak?search=' + searchQuery)
        : navigate('/kategori/ibu-anak')}>Ibu & Anak</p>
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
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 1)} />
                        Batuk & flu
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 2)} />
                        Mulut & tenggorokan
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 13)} />
                        Imun booster
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 10)} />
                        Maag
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 5)} />
                        Diare
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 6)} />
                        Demam & sakit kepala
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 7)} />
                        Diabetes
                    </label>
                    <label className='sidebar-checkbox'>
                        <input type="checkbox" onClick={(event) => keluhanFunc(event, 8)} />
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
                <p style={{fontSize:'24px', fontWeight:'700'}}>{headerKategori}</p>
                <hr style={{borderColor:'#B4B9C7', borderWidth:'2px'}} />
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        {
                            searchQuery 
                            ? <div className='filter-bullet'>
                                {`${numProducts} hasil pencarian "${searchQuery}"`}
                                <FontAwesomeIcon icon={faXmark} className='filter-bullet-x'
                                onClick={() => setSearchParams({})} />
                            </div>
                            : <p className='product-header-description'>{numProducts} produk di {headerKategori}</p>
                        }
                    
                    <div style={{display:'flex', alignItems:'center'}}>
                        <p className='product-header-description'>Urutkan</p>
                        <div class="custom-select">
                            <select>
                                <option onClick={() => setSortBy('AZ')} className='custom-select-option'>Nama produk (A-Z)</option>
                                <option onClick={() => setSortBy('ZA')} className='custom-select-option'>Nama produk (Z-A)</option>
                                <option onClick={() => setSortBy('hargaTerendah')} className='custom-select-option'>Harga terendah</option>
                                <option onClick={() => setSortBy('hargaTertinggi')} className='custom-select-option'>Harga tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id='product-cards-container'>
                    {
                        loading
                        ? <h1>Loading...</h1>
                        : products.length ?
                        products.map((product, index) => {
                            return <ProductCardSmall key={product.id} product={product} />
                        })
                        : <div className='d-flex flex-column align-items-center' style={{width:'100%'}}>
                            <img src={noProductIllust} alt="" style={{width:'250px', margin:'20px'}} />
                            <p style={{color:'#213360', fontSize:'20px', fontWeight:'700', margin:'0px 0px 10px'}}>Oops, produk tidak ditemukan</p>
                            <p style={{color:'#8f939e', fontSize:'14px', margin:'0px 0px 30px'}}>Coba kurangi filter pencarian Anda</p>
                        </div>
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