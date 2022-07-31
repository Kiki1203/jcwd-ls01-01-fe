import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../../Helpers/API_URL.js';
import './LabaRugi.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import { Navigate } from 'react-router-dom';

const LabaRugi = () => {
  const [tokenAdmin, setTokenAdmin] = useState('');
  const [penjualan, setPenjualan] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [persediaan, setPersediaan] = useState([]);
  const [persediaanAkhir, setPersediaanAkhir] = useState([]);
  const [pembelian, setPembelian] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);
  var time = new Date().getTime(); // get your number
  var date = new Date(time); // create Date object

  const getData = (e) => {
    console.log(e);

    axios
      .get(`${API_URL}/admin/labarugi`, {
        headers: {
          tahun: e,
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
        setPenjualan(data.penjualan_barang[0].Penjualan_barang);
        setOngkir(data.ongkir[0].ongkir);
        setPersediaan(data.persediaan_awal[0].persediaan_awal);
        setPembelian(data.pembelian_kotor[0].pembelian_kotor);
        setPersediaanAkhir(data.persediaan_akhir[0].persediaan_akhir);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const labaRugi = () => {
    return (
      <div>
        <SidebarAdmin />
        <div className="container-fluid-laba">
          <div className="mkm mb-2">Laporan Laba & Rugi</div>
          <div className="spa mb-5"> Update terakhir: {date.toString()}</div>
          <div className="row justify-content-start mb-4">
            <div className="col-3">
              <div className="isi-laba">Periode :</div>
              <select
                class="form-select form-select-sm"
                aria-label="form-select-sm example"
                onChange={(e) => {
                  getData(e.target.value);
                }}
              >
                <option selected>Tahun</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div className="box-statistik">
            <div className="box-table-laba">
              <div className="text-center mkm mb-5">Laporan Laba & Rugi</div>
              <div className="row mb-4 title-laba">
                <div className="col-6 text-start">Penjualan</div>
                <div className="col-6 text-end">dalam rupiah </div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">1. Penjualan Barang</div>
                <div className="col-6 text-end">{rupiah(penjualan)}</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">2. Total Service</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">3. Total Embalanse</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">4. Ongkos Kirim</div>
                <div className="col-6 text-end">{rupiah(ongkir)}</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">5. Diskon Penjualan</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">6. Retur Penjualan</div>
                <div className="col-6 text-end">0</div>
              </div>
              <hr />
              <div className="row mb-3 hasil-laba">
                <div className="col-6 text-start">Penjualan Bersih</div>
                <div className="col-6 text-end">{rupiah(penjualan + ongkir)}</div>
              </div>
              <div className="row mb-3 title-laba ">
                <div className="col-6 text-start title-laba">Harga Pokok Penjualan </div>
                <div className="col-6 text-end"></div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">1. Persediaan Awal</div>
                <div className="col-6 text-end">{rupiah(persediaan)}</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">2. Pembelian Kotor</div>
                <div className="col-6 text-end">{rupiah(pembelian)}</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">3. Retur Pembelian Kotor</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">4. Mutasi Barang Masuk</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">5. Mutasi Barang Keluar</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">6. Persediaan Akhir </div>
                <div className="col-6 text-end">{rupiah(persediaanAkhir)}</div>
              </div>
              <hr />
              <div className="row mb-3 hasil-laba">
                <div className="col-6 text-start">Harga Pokok Penjualan </div>
                <div className="col-6 text-end">{rupiah(persediaan + pembelian - persediaanAkhir)}</div>
              </div>
              <div className="row mb-3 title-laba">
                <div className="col-6 text-start">Laba Kotor</div>
                <div className="col-6 text-end"></div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">1. Penjualan Bersih</div>
                <div className="col-6 text-end">{rupiah(penjualan + ongkir)}</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">2. Harga Pokok Penjualan </div>
                <div className="col-6 text-end">{rupiah(persediaan + pembelian - persediaanAkhir)}</div>
              </div>
              <hr />
              <div className="row mb-3 hasil-laba">
                <div className="col-6 text-start">Laba Kotor</div>
                <div className="col-6 text-end">{rupiah(penjualan + ongkir - (persediaan + pembelian - persediaanAkhir))}</div>
              </div>
              <div className="row mb-3 title-laba">
                <div className="col-6 text-start">Pengeluaran Operasional</div>
                <div className="col-6 text-end"></div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">1. Gaji Karyawan</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">2. Listrik</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">3. Air</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">4. Telepon</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">5. Internet</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">6. Sewa Tempat</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">7. Peralatan Kantor</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">8. Biaya Pengadaan</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">9. Biaya Operasional Lainya</div>
                <div className="col-6 text-end">0</div>
              </div>
              <hr />
              <div className="row mb-3 hasil-laba">
                <div className="col-6 text-start">Pengeluaran Operasional</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row mb-3 title-laba">
                <div className="col-6 text-start">Pendapatan Lainya </div>
                <div className="col-6 text-end"></div>
              </div>
              <div className="row isi-laba ">
                <div className="col-6 text-start ">1. Cashback Pembelian </div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">2. Keuntungan Konsiyasi </div>
                <div className="col-6 text-end">0</div>
              </div>
              <hr />
              <div className="row mb-3 hasil-laba">
                <div className="col-6 text-start">Pendapatan Lainya </div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row mb-3 title-laba">
                <div className="col-6 text-start">Laba Bersih </div>
                <div className="col-6 text-end"></div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">1. Laba Kotor</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">2. Pengeluaran Operasional</div>
                <div className="col-6 text-end">0</div>
              </div>
              <div className="row isi-laba">
                <div className="col-6 text-start">3. Pendapatan Lainya </div>
                <div className="col-6 text-end">0</div>
              </div>
              <hr />
              <div className="row mb-3 hasil-laba">
                <div className="col-6 text-start">Laba Bersih </div>
                <div className="col-6 text-end">{rupiah(penjualan + ongkir - (persediaan + pembelian - persediaanAkhir))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (localStorage.getItem('myTkn')) {
    if (localStorage.getItem('myTkn') === tokenAdmin) {
      return <>{labaRugi()}</>;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (localStorage.getItem('token') === tokenAdmin) {
      return <>{labaRugi()}</>;
    } else if (!localStorage.getItem('token')) {
      return <Navigate to="/loginadmin" />;
    }
  }
};
export default LabaRugi;
