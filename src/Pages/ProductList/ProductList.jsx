import React from 'react';
import './ProductList.css'
import ProductCard from '../../Components/ProductCard/ProductCard';

function ProductList(props) {
    let replaceLater = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
    
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
                <p style={{fontSize:'24px', fontWeight:'700'}}>Obat</p>
                <hr style={{borderColor:'#B4B9C7', borderWidth:'2px'}} />
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <p style={{fontSize:'14px', color:'#737A8D', margin:'0px'}}>45 produk di obat-obatan</p>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <p style={{fontSize:'14px', color:'#737A8D', margin:'0px'}}>Urutkan</p>
                        <div class="custom-select">
                            <select>
                                <option>Nama produk (A-Z)</option>
                                <option>Nama produk (Z-A)</option>
                                <option>Harga terendah</option>
                                <option>Harga tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id='product-cards-container'>
                    {
                        replaceLater.map((product, index) => {
                                return <div key={product}>
                                    <ProductCard />
                                </div>
                            }
                        )
                    }
                </div>
                
            </div>
        </div>
    );
}

export default ProductList;