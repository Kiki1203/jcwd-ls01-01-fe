
import React, { useEffect, useState , PureComponent  } from 'react'
import { Navigate } from 'react-router-dom'
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import satu from '../../../Assets/satu.svg'
import dua from '../../../Assets/dua.svg'
import tiga from '../../../Assets/tiga.png'
import rev1 from '../../../Assets/Rev1.svg'
import rev2 from '../../../Assets/Rev.png'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

const DashboardAdmin  = () => {
  const [tokenAdmin, setTokenAdmin] = useState('')
  const [data, setData] = useState('')
  const [stok, setStok] = useState('')
  const [pesananBaru, setPesananBaru] = useState('')
  const [pesananBaru2, setPesananBaru2] = useState('')
  const [pesananBaru3, setPesananBaru3] = useState('')
  const [siapKirim, setSiapkirim] = useState('')
  const [sedangKirim, setSedangkirim] = useState('')
  const [selesai, setSelesai] = useState('')
  const [batalkan, setBatalkan] = useState('')



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
    let token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `${token}`,
      },
    };
    axios
      .get(`${API_URL}/admin/gethomedata`, headers)
      .then((res) => {
        console.log(res);
        setStok();
        setData(res.data.data.length);
        setPesananBaru(res.data.pesananBaru.length);
        setPesananBaru2(res.data.pesananBaru2.length);
        setPesananBaru3(res.data.pesananBaru3.length);
        setSiapkirim(res.data.siapKirim.length);
        setSedangkirim(res.data.sedangKirim.length);
        setSelesai(res.data.selesai.length);
        setBatalkan(res.data.dibatalkan.length);
      })
      .catch((err) => {
        console.log('ini err get', err);
      });

  }, [stok]);



const data2 = [
    {
      name: 'Jan',
      obatBebas: 4000,
      obatRacikan: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      obatBebas: 3000,
      obatRacikan: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      obatBebas: 2000,
      obatRacikan: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      obatBebas: 2780,
      obatRacikan: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      obatBebas: 1890,
    obatRacikan: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      obatBeas: 2390,
      obatRacikan: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      obatBebas: 3490,
      obatRacikan: 4200,
      amt: 2100,
    },
    {
      name: 'Ags',
      obatBebas: 3500,
      obatRacikan: 4100,
      amt: 2100,
    },
    {
      name: 'Sep',
      obatBebas: 3400,
      obatRacikan: 4300,
      amt: 2100,
    },
    {
      name: 'Okt',
      obatBebas: 3495,
      obatRacikan: 4400,
      amt: 2100,
    },
    {
      name: 'Nov',
      obatBebas: 3450,
      obatRacikan: 4500,
      amt: 2100,
    },
    {
      name: 'Des',
      obatBebas: 3490,
      obatRacikan: 4300,
      amt: 2100,
    },
  ];
  const data3 = [
    {
      name: 'Dibatalkan Auto',
      obatRacikan: 120,
    },
    {
      name: 'Ditolak Apotik',
      obatRacikan: 50,
    },
    {
      name: 'Permintaan Pembeli',
      obatRacikan: 140,
    },
  ];


  const homePageAdmin = () => {
    var newPesanan = pesananBaru + pesananBaru2 + pesananBaru3;
    return (
      <>
        <SidebarAdmin />
        <div className="container">
          <div className="full-box-dashboard-admin-page">
            <div className="tulisan-analisis-produk-admin">Analisis Produk & Toko</div>
            <div className="keterangan-update-terakhir-barang">Update terakhir: 20 Januari 2022, 14.30 WIB</div>
            <div className="box-1-dashboard-admin">
              <div className="judul-profit-hari-ini">Profit Hari Ini</div>
              <div className="nominal-total-profit-hari-ini">Rp 10.213.500</div>
              <div className="row-profit-dashboard">
                <FontAwesomeIcon icon={faArrowCircleRight} className="" />
              </div>
              <div className="keterangan-row-profit">+5.700.000</div>
              <div>
                {' '}
                <img src={satu} alt="" className="prosentase-profit-box" />
              </div>
            </div>
            <div className="box-2-dashboard-admin">
              <div className="judul-total-pemesanan-today">Total Pemesanan Hari Ini </div>
              <div className="nominal-total-pemesanan-today">{data}</div>
              <div className="row-2-profit-dashboard">
                <FontAwesomeIcon icon={faArrowCircleRight} className="" />
              </div>
              <div className="keterangan-row-2-profit">-60</div>
              <div>
                {' '}
                <img src={dua} alt="" className="prosentase-profit-box-2" />
              </div>
            </div>
            <div className="box-3-dashboard-admin">
              <div className="judul-sisa-stok-today">Sisa Stok Hari Ini</div>
              <div className="nominal-sisa-stok-today">1.500</div>
              <div className="row-sisa-stok-dashboard">
                <FontAwesomeIcon icon={faArrowCircleRight} className="" />
              </div>
              <div className="keterangan-row-sisa-stok">+1.200</div>
              <div>
                {' '}
                <img src={tiga} alt="" className="prosentase-sisa-stok-box-2" />
              </div>
            </div>
            <div className="tulisan-penting-hari-ini">Penting Hari Ini</div>
            <div className="tulisan-aktivitas-dashboard">Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan</div>
            <div className="box-pesanan-baru-dashboard-admin">
              <div className="judul-box-pesanan">Pesanan Baru</div>
              <div className="nominal-box-pesanan">{newPesanan}</div>
            </div>
            <div className="box-siap-dikirim-dashboard-admin">
              <div className="judul-box-siap-dikirim">Siap Dikirim</div>
              <div className="nominal-box-siap-dikirim">{siapKirim}</div>
            </div>
            <div className="box-sedang-dikirim-dashboard-admin">
              <div className="judul-box-sedang-dikirim">Sedang Dikirim</div>
              <div className="nominal-box-sedang-dikirim">{sedangKirim}</div>
            </div>
            <div className="box-selesai-dashboard-admin">
              <div className="judul-box-selesai">Selesai</div>
              <div className="nominal-box-selesai">{selesai}</div>
            </div>
            <div className="box-dibatalkan-dashboard-admin">
              <div className="judul-box-dibatalkan">Dibatalkan</div>
              <div className="nominal-box-dibatalkan">{batalkan}</div>
            </div>
            <div className="box-chat-baru-dashboard-admin">
              <div className="judul-box-chat-baru">Chat Baru</div>
              <div className="nominal-box-chat-baru">0</div>
            </div>
            <div className="tulisan-kadaluarsa-obat-dashboard">Kedaluwarsa Obat</div>
            <div className="tulisan-cek-tanggal-kadaluarsa-dashboard">Cek tanggal kedaluwarsa untuk mengorganisir stok obat </div>
            <div className="box-kadaluarsa-dashboard-admin">
              <div className="keterangan-telah-expired">Telah Kedaluwarsa</div>
              <div className="nominal-telah-expired">0</div>
              <div className="keterangan-expired-bulan-ini">Kedaluwarsa Bulan Ini</div>
              <div className="jumlah-expired-bulan-ini">0</div>
              <div className="keterangan-expired-3-bulan-lagi">Kedaluwarsa 3 Bulan Kedepan</div>
              <div className="nominal-expired-3-bulan-lagi">0</div>
            </div>
            <img src={rev1} alt="" className="box-profit-dashboard-admin" />
            <img src={rev2} alt="" className="box-penjualan-obat-dashboard-admin" />
          </div>
        </div>
      </>
    );
  };

  if (localStorage.getItem('myTkn')) {
    if (localStorage.getItem('myTkn') === tokenAdmin) {
      return <>{homePageAdmin()}</>;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (localStorage.getItem('token') === tokenAdmin) {
      return <>{homePageAdmin()}</>;
    } else if (!localStorage.getItem('token')) {
      return <Navigate to="/loginadmin" />;
    }
  }
};

export default DashboardAdmin;
