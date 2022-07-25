import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormAddress.css';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import Swal from 'sweetalert2';

const FormAddress = () => {
  const token = localStorage.getItem('myTkn');
  const [NamaDepan, SetNamaDepan] = useState('');
  const [NameBelakang, SetNamaBelakang] = useState('');
  const [LabelAlamat, SetLabelAlamat] = useState('');
  const [NoHP, SetNoHP] = useState('');
  const [Alamat, SetAlamat] = useState('');
  const [AlamatUtama, SetAlamatUtama] = useState('0');
  const [IdKota, SetIdKota] = useState('');
  const [Kota, SetKota] = useState('');
  const [IdProvinsi, SetIdProvinsi] = useState('');
  const [Provinsi, SetProvinsi] = useState('');
  const [Province, setProvince] = useState([]);
  const [City, setCity] = useState([]);
  const [Nocity, setNocity] = useState(true);
  const [Selectcity, setSelectcity] = useState('');
  const [Kodepos, setKodepos] = useState('');
  const [Selectedindex, setSelectedindex] = useState(null);
  const { state } = useLocation();
  const previousPath = state?.previousPath
  const transactionId = state?.transactionId
  const navigate = useNavigate()

  useEffect(() => {
    getProvince();
    getCity();
  }, []);

  useEffect(() => {
    if (City.length > 0) {
      if (Selectedindex === null) {
        setNocity(true);
        setKodepos('');
        setSelectcity('');
      } else {
        setNocity(false);
        setKodepos(City[Selectedindex].postal_code);
        setSelectcity(City[Selectedindex].city_name);
      }
    }
  }, [Selectedindex, City, Selectcity]);

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
    setSelectedindex(null);
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
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const addAddress = async () => {
    const dataAlamat = {
      labelAlamat: LabelAlamat,
      namaDepan: NamaDepan,
      namaBelakang: NameBelakang,
      noHp: NoHP,
      idProvinsi: IdProvinsi,
      provinsi: Provinsi,
      idKabupaten_kota: IdKota,
      kabupatenKota: Kota,
      alamat: Alamat,
      kodePos: Kodepos,
      alamatUtama: AlamatUtama,
    };

    if (!LabelAlamat || !NamaDepan || !NameBelakang || !NoHP || !Alamat) {
      return Toast.fire({ html: 'Isi semua data!', icon: 'warning', title: 'Peringatan!' });
    }
    if (!/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g.test(NoHP)) {
      return Toast.fire({ html: 'Nomor HP belum sesuai', icon: 'warning', title: 'Peringatan!' });
    }

    await axios
      .post(`${API_URL}/user/addaddress`, { dataAlamat: dataAlamat }, { headers: { authorization: token } })
      .then((res) => {
        Swal.fire({
          title: 'Sukses!',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'Oke!',
        });
        let destination = ''
        if(previousPath === '/cart'){
          destination = '/checkout/produk-bebas'
        } else if(previousPath.includes('/checkout')){
          destination = previousPath
        } else if(previousPath === '/ditunggu' || previousPath === '/semuapesanan'){
          destination = `/checkout/resep?id=${transactionId}`
        }
        navigate(destination)
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Okay!',
        });
      });
  };

  const onSubmit = async () => {
    addAddress();
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
          <input type="text" className="input-alamat" onChange={(e) => SetLabelAlamat(e.target.value)} />
          <p className="title-input" style={{ margin: '30px 0px 5px' }}>
            Info Penerima
          </p>
          <div className="d-flex justify-content-between">
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Nama Depan</p>
              <input type="text" className="input-alamat" onChange={(e) => SetNamaDepan(e.target.value)} />
            </div>
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Nama Belakang</p>
              <input type="text" className="input-alamat" onChange={(e) => SetNamaBelakang(e.target.value)} />
            </div>
          </div>
          <p className="mini-title-input">Nomor HP</p>
          <input type="text" className="input-alamat" style={{ width: '48%' }} onChange={(e) => SetNoHP(e.target.value)} />
          <div className="d-flex justify-content-between">
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Provinsi</p>
              <select
                className="select-alamat"
                onChange={(e) => {
                  getCity(e.target.value.split('-')[0]);
                  SetIdProvinsi(e.target.value.split('-')[0]);
                  SetProvinsi(e.target.value.split('-')[1]);
                }}
              >
                <option selected className="selected">
                  Pilih Provinsi
                </option>
                {Province.map((value, index) => {
                  return (
                    <option value={`${value.province_id}-${value.province}`} key={index}>
                      {value.province}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ width: '48%' }}>
              <p className="mini-title-input">Kota/Kabupaten</p>
              <select
                className="select-alamat"
                onChange={(e) => {
                  setSelectedindex(e.target.value.split('-')[0]);
                  SetIdKota(e.target.value.split('-')[1]);
                  SetKota(e.target.value.split('-')[2]);
                }}
              >
                <option selected={Nocity} className="selected">
                  Pilih Kota/Kabupaten
                </option>
                {City.map((value, index) => {
                  return (
                    <option value={`${index}-${value.city_id}-${value.city_name}`} key={index} onChange={(e) => SetIdKota(e.target.value.city.id)}>
                      {value.city_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <p className="mini-title-input">Alamat</p>
          <input type="text" className="input-alamat" onChange={(e) => SetAlamat(e.target.value)} />
          <p className="mini-title-input">Kode Pos</p>
          <input type="text" className="input-alamat" disabled placeholder="Pilih kota" value={Kodepos} style={{ width: '48%' }} />
          <label className="sidebar-checkbox mt-4 mb-5 d-block">
            <input type="checkbox" onChange={(e) => SetAlamatUtama(e.target.checked === true ? '1' : '0')} />
            Simpan sebagai alamat utama
          </label>
          <div className="d-flex justify-content-between mb-5">
            <button className="button-bayar"
              style={{ width: '48%', backgroundColor: 'white', color: '#E0004D', border: '2px solid #E0004D' }}
              onClick={() => navigate(previousPath)}>
              Batalkan
            </button>
            <button
              className="button-bayar"
              style={{ width: '48%' }}
              onClick={() => {
                onSubmit();
              }}
            >
              Simpan Alamat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddress;
