import React, { useState, useEffect } from 'react';
import './FormAddress.css';
import axios from 'axios';

const FormAddress = () => {
  const [Province, setProvince] = useState([]);
  const [City, setCity] = useState([]);
  const [isCity, setIsCity] = useState(false);

  // List untuk placeholder, nanti di-replace pakai data dari rajaongkir

  let kodePos = ['15411', '15412', '15413', '15414', '15415'];
  useEffect(() => {
    getProvince();
    getCity();
  }, []);

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
                  return <option value={value.province_id}>{value.province}</option>;
                })}
              </select>
            </div>
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Kota/Kabupaten</p>
              <select className="select-alamat">
                <option selected className="selected">
                  Pilih Kota/Kabupaten
                </option>
                {City.map((value, index) => {
                  return <option>{value.city_name}</option>;
                })}
              </select>
            </div>
          </div>
          <p className="mini-title-input">Alamat</p>
          <input type="text" className="input-alamat" />
          <p className="mini-title-input">Kode Pos</p>
          <select className="select-alamat" style={{ width: '48%' }}>
            <option selected className="selected">
              Pilih Kode Pos
            </option>
            {kodePos.map((k) => (
              <option className="option-alamat">{k}</option>
            ))}
          </select>
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
