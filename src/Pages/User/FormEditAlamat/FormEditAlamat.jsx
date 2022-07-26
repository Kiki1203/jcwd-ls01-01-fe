import React, { useState, useEffect } from 'react';
import './FormEditAlamat.css';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const FormEditAlamat = () => {
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
  const navigate = useNavigate();
  let params = useParams();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState('')
  const [tokenUser, setTokenUser] = useState("");
  useEffect(() => {
    
    let tokens = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${tokens}`,
        }
    }
    axios.get(`${API_URL}/user/checkuserverify`, headers)
    .then((res) => {
      
        setVerified(res.data.verified)
        setTokenUser(res.data.token)
    }).catch((err) => {
        console.log('ini err get',err)
       
    })
  }, [tokenUser, verified])

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
      .get(`${API_URL}/rajaongkir/getProvince`)
      .then((response) => {
        console.log('provinsi', response.data.data.rajaongkir.results)
        setProvince(response.data.data.rajaongkir.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let token = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${token}`,
        }
    }
    axios.get(`${API_URL}/user/getalamatuser2/${params.id}`, headers)
    .then((res) => {
        SetNamaDepan(res.data[0].nama_depan_penerima)
        SetNamaBelakang(res.data[0].nama_belakang_penerima)
        SetNoHP(res.data[0].no_hp)
        SetAlamat(res.data[0].alamat)
        SetAlamatUtama(res.data[0].alamat_utama)
        SetIdKota(res.data[0].id_kabupaten_kota)
        SetKota(res.data[0].kabupaten_kota)
        SetIdProvinsi(res.data[0].id_provinsi)
        SetProvinsi(res.data[0].provinsi)
        SetLabelAlamat(res.data[0].label_alamat)
        setKodepos(res.data[0].kode_pos)
    }).catch((err) => {
        console.log('ini err get',err)
    })
}, [])

  const getCity = (e) => {
    console.log(e);
    setSelectedindex(null);
    axios
      .get(`${API_URL}/rajaongkir/getCity`, {
        headers: {
          ProvinceId: e,
        },
      })
      .then((response) => {
        console.log('city',response.data.data.rajaongkir.results);
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

  const EditAddress = async () => {
    let token = localStorage.getItem('myTkn')
    const headers = {
        headers: { 
            'Authorization': `${token}`,
        }
    }

    if (!/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g.test(NoHP)) {
      return Toast.fire({ html: 'Nomor HP belum sesuai', icon: 'warning', title: 'Peringatan!' });
    }

    var data = {
      label_alamat: LabelAlamat,
      nama_depan_penerima: NamaDepan,
      nama_belakang_penerima: NameBelakang,
      no_hp: NoHP,
      id_provinsi: IdProvinsi,
      provinsi: Provinsi,
      id_kabupaten_kota: IdKota,
      kabupaten_kota: Kota,
      alamat: Alamat,
      kode_pos: Kodepos,
      alamat_utama: AlamatUtama,
    };

    await axios
      .patch(`${API_URL}/user/editalamat/${params.id}`, data, { headers: { authorization: token } })
      .then((res) => {
        console.log('res', res)
        Swal.fire({
          title: 'Succes!',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'Okay!',
        });
        navigate('/alamatpengiriman');
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
    EditAddress();
  };

  const editAlamat = () => {
    return (
      <div>
        <div />
        <div id="page-container-ap">
          <div id="form-address-container-2">
          <div className="d-lg-none d-md-none d-block d-flex navbar-pro">
                      <div>
                          <Link to='/profile' style={{ textDecoration:"none", color: "black", cursor: 'pointer', fontSize: "12px", marginTop: "35px", marginLeft:"10px" }}>
                              <FontAwesomeIcon icon={faAngleLeft} className="logo-1-p" style={{marginTop: "5px"}}/>
                          </Link>
                      </div>
                      <div  id="header-alamat-pengiriman-2"  style={{marginTop: "35px", marginLeft: "30px"}}>Edit Alamat Pengiriman</div>
                  </div>
                  <div className="d-lg-block d-md-block d-none">
                  <div  id="header-alamat-pengiriman">Edit Alamat Pengiriman</div>
                  </div>
            <div className="d-flex mt-2">
              <p className="title-input">Label Alamat</p>
              <p className="contoh-input">Contoh: Apartemen</p>
            </div>
            <input type="text" className="input-alamat" defaultValue={LabelAlamat} onChange={(e) => SetLabelAlamat(e.target.value)} />
            <p className="title-input" style={{ margin: '10px 0px 5px' }}>
              Info Penerima
            </p>
            <div className="d-flex justify-content-between">
              <div style={{ width: '48%' }}>
                <p className="mini-title-input">Nama Depan</p>
                <input type="text" className="input-alamat" defaultValue={NamaDepan} onChange={(e) => SetNamaDepan(e.target.value)} />
              </div>
              <div style={{ width: '48%' }}>
                <p className="mini-title-input">Nama Belakang</p>
                <input type="text" className="input-alamat" defaultValue={NameBelakang} onChange={(e) => SetNamaBelakang(e.target.value)} />
              </div>
            </div>
            <p className="mini-title-input">Nomor HP</p>
            <input type="text" className="input-alamat" defaultValue={NoHP} style={{ width: '48%' }} onChange={(e) => SetNoHP(e.target.value)} />
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
                  {
                   Provinsi ?
                   <>
                    <option selected className="selected">
                   {Provinsi}
                  </option>
                    {Province.map((value, index) => {
                    return (
                      <option value={`${value.province_id}-${value.province}`} key={index}>
                        {value.province}
                      </option>
                    );
                  })}
                   </>
                   :
                   <>
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
                   </> 
                  }
                  
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
                  {
                    Kota ?
                    <>  
                  <option selected={Nocity} className="selected">
                   {Kota}
                  </option>
                  {City.map((value, index) => {
                    return (
                      <option value={`${index}-${value.city_id}-${value.city_name}`} key={index} onChange={(e) => SetIdKota(e.target.value.city.id)}>
                        {value.city_name}
                      </option>
                    );
                  })}</>
                    :
                    <>
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
                    </>
                  }
                 
                </select>
              </div>
            </div>
            <p className="mini-title-input">Alamat</p>
            <input type="text" className="input-alamat" defaultValue={Alamat} onChange={(e) => SetAlamat(e.target.value)} />
            <p className="mini-title-input">Kode Pos</p>
            <input type="text" className="input-alamat" disabled placeholder="Pilih kota" value={Kodepos} style={{ width: '48%' }} />
              {
                AlamatUtama === 1 ?
                <label className="sidebar-checkbox mt-2 mb-0 d-block">
                <input type="checkbox" onChange={(e) => SetAlamatUtama(e.target.checked === true ? '0' : '1')} />
                Simpan bukan sebagai alamat utama
              </label>
                :
              <label className="sidebar-checkbox mt-2 d-block">
                <input type="checkbox" onChange={(e) => SetAlamatUtama(e.target.checked === true ? '1' : '0')} />
                Simpan sebagai alamat utama
              </label>
              }
            <div className="d-flex justify-content-between ">
              <button className="button-bayar" style={{ width: '48%', backgroundColor: 'white', color: '#E0004D', border: '2px solid #E0004D' }} onClick={() => navigate(`/alamatpengiriman`)}>
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
  }

  if(localStorage.getItem('myTkn')){
    if(verified === 0){
      return(
        <Navigate to='/verification' />
      )
    }else{
      return(
        <>{editAlamat()}</>
      )
    }
  }else{
    if(localStorage.getItem('token') === tokenUser){
      if(verified === 0){
        return(
          <Navigate to='/verification' />
        )
      }else{
        return(
          <>{editAlamat()}</>
        )  
      }
    }else{
      return(
        <Navigate to='/' />
      ) 
    }
  }
  
};

export default FormEditAlamat;
