import React, { useState, useEffect } from 'react';
import './FormAddress.css';
import axios from 'axios';

const FormAddress = () => {
  const [Province, setProvince] = useState([]);
  const [City, setCity] = useState([]);
  const [Nocity, setNocity] = useState(true)
  const [Selectcity, setSelectcity] = useState('');
  const [Kodepos, setKodepos] = useState('');
  const [Selectedindex, setSelectedindex] = useState(null)
  // List untuk placeholder, nanti di-replace pakai data dari rajaongkir

  useEffect(() => {
    getProvince();
    getCity();
  }, []);

  useEffect(() => {
    if(City.length > 0) {
      if(Selectedindex === null){
        setNocity(true)
        setKodepos('')
        setSelectcity('')
      } else {
        setNocity(false)
        setKodepos(City[Selectedindex].postal_code)
        setSelectcity(City[Selectedindex].city_name);        
      }
    }
  }, [Selectedindex, City])

  const getProvince = () => {
    axios
      .get('http://localhost:5000/rajaongkir/getProvince')
      .then((response) => {
        setProvince(response.data.data.rajaongkir.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCity = (e) => {
    console.log(e);
    setSelectedindex(null)
    axios
      .get('http://localhost:5000/rajaongkir/getCity', {
        headers: {
          ProvinceId: e,
        },
      })
      .then((response) => {
        console.log(response.data.data.rajaongkir.results);
        setCity(response.data.data.rajaongkir.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ position: 'relative', width: '100vw', overflowX: 'hidden' }}>
      <div id="corner-gradient" />
      <div id="page-container">
        <div id="form-address-container">
          <p id="header-alamat-pengiriman">Alamat Pengiriman</p>
          <div className="d-flex mt-5">
            <p className="title-input">Label Alamat</p>
            <p className="contoh-input">Contoh: Apartemen</p>
          </div>
          <input type="text" className="input-alamat" />
          <p className="title-input" style={{ margin: '30px 0px 5px' }}>
            Info Penerima
          </p>
          <div className="d-flex justify-content-between">
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Nama Depan</p>
              <input type="text" className="input-alamat" />
            </div>
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Nama Belakang</p>
              <input type="text" className="input-alamat" />
            </div>
          </div>
          <p className="mini-title-input">Nomor HP</p>
          <input type="text" className="input-alamat" style={{ width: '48%' }} />
          <div className="d-flex justify-content-between">
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Provinsi</p>
              <select className="select-alamat" onChange={(e) => getCity(e.target.value)}>
                <option selected className="selected">
                  Pilih Provinsi
                </option>
                {Province.map((value, index) => {
                  return <option value={value.province_id} key={index}>{value.province}</option>;
                })}
              </select>
            </div>
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Kota/Kabupaten</p>
              <select className="select-alamat" onChange={(e) => {setSelectedindex(e.target.value)}}>
                <option selected={Nocity} className="selected">
                  Pilih Kota/Kabupaten
                </option>
                {City.map((value, index) => {
                  return (
                    <option value={index} key={index}>
                      {value.city_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <p className="mini-title-input">Alamat</p>
          <input type="text" className="input-alamat" />
          <p className="mini-title-input">Kode Pos</p>
          <input type="text" className="input-alamat" disabled placeholder="Pilih kota" value={Kodepos} style={{ width: '48%' }} />
          <label className="sidebar-checkbox mt-4 mb-5 d-block">
            <input type="checkbox" />
            Simpan sebagai alamat utama
          </label>

          <div className="d-flex justify-content-between mb-5">
            <button className="button-bayar" style={{ width: '48%', backgroundColor: 'white', color: '#E0004D', border: '2px solid #E0004D' }}>
              Batalkan
            </button>
            <button className="button-bayar" style={{ width: '48%' }}>
              Simpan Alamat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddress;
