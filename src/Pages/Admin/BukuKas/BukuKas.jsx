import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import './BukuKas.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import moment from 'moment';

const BukuKas = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [tokenAdmin, setTokenAdmin] = useState('');
  useEffect(() => {
    let token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `${token}`,
      },
    };
    axios
      .get(`${API_URL}/admin/gettokenadmin`, headers)
      .then((res) => {
        setTokenAdmin(res.data[0].token);
      })
      .catch((err) => {
        console.log('ini err get', err);
      });
  }, [tokenAdmin]);

  const fetchbukukas = async () => {
    const response = await axios.get(`${API_URL}/admin/bukukas`).catch((err) => console.log(err));
    if (response) {
      const databukukas = response.data;
      console.log('datamasuk', databukukas.masuk);
      setData(databukukas.masuk);
      setData1(databukukas.keluar);
    }
  };

  useEffect(() => {
    fetchbukukas();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const bukuKas = () => {
    return (
      <div>
        <SidebarAdmin />
        <div className="container-fluid-buku">
          <div className="box-statistik">
            <div className="box-table-buku">
              <div className="row mb-5">
                <div className="col-3 text-start">
                  <div className="mb-2">Akun kas</div>
                  <div>BCA xxxxxxxxxx</div>
                </div>
                <div className="col-3 text-start">
                  <div>Tanggal</div>
                  <div>
                    <InputGroup>
                      <Input type="date" />
                    </InputGroup>
                  </div>
                </div>
                <div className="col-5 text-start">
                  <br />
                  <div>
                    {' '}
                    <InputGroup>
                      <InputGroupText style={{ background: 'white' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </InputGroupText>
                      <Input placeholder="Cari nama obat" />
                    </InputGroup>
                  </div>
                </div>
              </div>
              <div className="box-table-isi">
                <table className="table box-table-isi">

                  <thead style={{ background: '#213360', color: 'white' }}>

                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Tanggal</th>
                      <th scope="col">Aktifitas</th>
                      <th scope="col">Masuk</th>
                      <th scope="col">Keluar</th>
                      <th scope="col">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => {
                      return (
                        <tr key={value.id}>

                          <th scope="row">{index + 1}</th>
                          <td>{moment(value.tanggalMasuk).format('DD/MM/YYYY')}</td>
                          <td>N0.Faktur pembelian:{value.noFakturMasuk}APTKPBB</td>
                          <td></td>
                          <td>{rupiah(value.hargaBeli * value.stokMasuk)}</td>
                          <td>{rupiah(7171500 - value.hargaBeli)}</td>

                        </tr>
                      );
                    })}
                    {data1.map((value, index) => {
                      return (
                        <tr key={value.id}>
                          <th scope="row">{index + 15}</th>
                          <td>{moment(value.tanggalKeluar).format('DD/MM/YYYY')}</td>
                          <td>N0.Faktur penjualan:{value.noFakturKeluar}</td>
                          <td>{rupiah(value.hargaKeluar)}</td>
                          <td></td>
                          <td>{rupiah(7171500 + value.hargaKeluar)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (localStorage.getItem('myTkn')) {
    if (localStorage.getItem('myTkn') === tokenAdmin) {
      return <>{bukuKas()}</>;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (localStorage.getItem('token') === tokenAdmin) {
      return <>{bukuKas()}</>;
    } else if (!localStorage.getItem('token')) {
      return <Navigate to="/loginadmin" />;
    }
  }
};

export default BukuKas;
