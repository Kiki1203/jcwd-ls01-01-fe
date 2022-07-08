import React from 'react';
import './FormAddress.css';

const FormAddress = () => {

  // List untuk placeholder, nanti di-replace pakai data dari rajaongkir
  let provinsi = ['DKI Jakarta', 'Banten', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Daerah Istimewa Yogyakarta']
  let kabupatenKota = ['Kota Tangerang', 'Kota Tangerang Selatan', 'Kabupaten Tangerang', 'Kota Cilegon', 'Kota Serang',
                      'Kabupaten Serang', 'Kabupaten Pandeglang']
  let kecamatan = ['Ciputat', 'Ciputat Timur', 'Pamulang', 'Pondok Aren', 'Serpong', 'Setu']
  let kodePos = ['15411', '15412', '15413', '15414', '15415']

  return (
    <div style={{position:'relative', width:'100vw', overflowX:'hidden'}}>
      <div id='corner-gradient' />
      <div id='page-container'>
        <div id='form-address-container'>
          <p id='header-alamat-pengiriman'>Alamat Pengiriman</p>
          <div className='d-flex mt-5'>
            <p className='title-input'>Label Alamat</p>
            <p className='contoh-input'>Contoh: Apartemen</p>
          </div>
          <input type="text" className='input-alamat' />
          <p className='title-input' style={{margin:'30px 0px 5px'}}>Info Penerima</p>
          <div className='d-flex justify-content-between'>
            <div style={{width:'48%'}}>
              <p className="mini-title-input">Nama Depan</p>
              <input type="text" className='input-alamat' />
            </div>
            <div style={{width:'48%'}}>
              <p className="mini-title-input">Nama Belakang</p>
              <input type="text" className='input-alamat' />
            </div>
          </div>
          <p className="mini-title-input">Nomor HP</p>
          <input type="text" className='input-alamat' style={{width:'48%'}} />
          <div className='d-flex justify-content-between'>
            <div style={{width:'48%'}}>
              <p className="mini-title-input">Provinsi</p>
              <select className='select-alamat'>
                <option selected className="selected">Pilih Provinsi</option>
                {
                  provinsi.map(p => <option className='option-alamat'>{p}</option>)
                }
              </select>
            </div>
            <div style={{width:'48%'}}>
              <p className="mini-title-input">Kota/Kabupaten</p>
              <select className='select-alamat'>
                <option selected className="selected">Pilih Kota/Kabupaten</option>
                {
                  kabupatenKota.map(k => <option className='option-alamat'>{k}</option>)
                }
              </select>
            </div>
          </div>
          <p className="mini-title-input">Kecamatan</p>
          <select className='select-alamat' style={{width:'48%'}}>
            <option selected className="selected">Pilih Kecamatan</option>
            {
              kecamatan.map(k => <option className='option-alamat'>{k}</option>)
            }
          </select>
          <p className="mini-title-input">Alamat</p>
          <input type="text" className='input-alamat' />
          <p className="mini-title-input">Kode Pos</p>
          <select className='select-alamat' style={{width:'48%'}}>
            <option selected className="selected">Pilih Kode Pos</option>
            {
              kodePos.map(k => <option className='option-alamat'>{k}</option>)
            }
          </select>
          <label className='sidebar-checkbox mt-4 mb-5 d-block'>
            <input type="checkbox" />
            Simpan sebagai alamat utama
          </label>
          <div className='d-flex justify-content-between mb-5'>
            <button className='button-bayar' style={{width:'48%', backgroundColor:'white', color:'#E0004D', border:'2px solid #E0004D'}}>
              Batalkan
            </button>
            <button className='button-bayar' style={{width:'48%'}}>
              Simpan Alamat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormAddress
