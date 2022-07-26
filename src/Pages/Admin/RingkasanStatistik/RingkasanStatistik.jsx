import React, { useState, useEffect } from "react";
import axios from 'axios';
import API_URL  from '../../../Helpers/API_URL.js';
import './RingkasanStatistik.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Navigate, useNavigate } from 'react-router-dom';

const RingkasanStatistik = () => {
  const [tokenAdmin, setTokenAdmin] = useState('')
  useEffect(() => {
    let token = localStorage.getItem('token')
    const headers = {
        headers: { 
            'Authorization': `${token}`,
        }
    }
    axios.get(`${API_URL}/admin/gettokenadmin`, headers)
    .then((res) => {
        setTokenAdmin(res.data[0].token)
    }).catch((err) => {
        console.log('ini err get',err)
    })
}, [tokenAdmin])


  const data = [
    {
      name: 'Jan',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Ags',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Sep',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Okt',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Nov',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Des',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const data2 = [
    {
      name: 'Dibatalkan Auto',
      pv: 120,
    },
    {
      name: 'Ditolak Apotik',
      pv: 50,
    },
    {
      name: 'Permintaan Pembeli',
      pv: 140,
    },
  ];

  const ringkasanStatistik = () => {
    return (
      <div>
        <SidebarAdmin />
        <div className="container-fluid-statistik">
          <div className="box-statistik">
            {/* header */}
            <div className="row justify-content-between mb-3">
              <div className="col-4">
                <h5 className="mt-3">Ringkasan Statistik</h5>
                <span style={{ 'font-size': '14px' }}>Update terakhir: 20 Januari 2022, 14.30 WIB</span>
              </div>
              <div className="col-3">
                <select class="mt-3 form-select form-select-sm" aria-label=".form-select-sm example">
                  <option selected>Open this select menu</option>
                  <option value="">One</option>
                  <option value="">Two</option>
                  <option value="">Three</option>
                </select>
              </div>
            </div>
            {/* box 6 */}
            <div className="row justify-content-between mb-5">
              <div className="col-1 px-3 py-3 box-kecil">
                <div>Pesanan Baru</div>
                <div style={{ 'font-size': '28px' }}>7</div>
              </div>
              <div className="col-1 px-3 py-3 box-kecil">
                <div>Siap Dikirim</div>
                <div style={{ 'font-size': '28px' }}>3</div>
              </div>
              <div className="col-1 col-1 px-3 py-3 box-kecil">
                <div>Sedang Dikirim</div>
                <div style={{ 'font-size': '28px' }}>0</div>
              </div>
              <div className="col-1 col-1 px-3 py-3 box-kecil">
                <div>Selesai</div>
                <div style={{ 'font-size': '28px' }}>7</div>
              </div>
              <div className="col-1 col-1 px-3 py-3 box-kecil">
                <div>Dibatalkan</div>
                <div style={{ 'font-size': '28px' }}>3</div>
              </div>
              <div className="col-1 col-1 px-3 py-3 box-kecil">
                <div>Chat Baru</div>
                <div style={{ 'font-size': '28px' }}>0</div>
              </div>
            </div>
            {/* chart penjualan */}
            <div className="box-chart-penjualan row px-3 py-3 mb-4">
              <div className="row justify-content-between mb-4">
                <div className="col-4">
                  {' '}
                  <h4>Penjualan obat </h4>
                </div>
                <div className="col-4">
                  <select class="form-select form-select-sm" aria-label="form-select-sm example">
                    <option selected>Open this select menu</option>
                    <option value="">One</option>
                    <option value="">Two</option>
                    <option value="">Three</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-10 chart_penjualan">
                  <LineChart width={700} height={300} data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis axisLine={false} tickLine={false} dataKey="name" />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend align="right" />
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={false} />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" dot={false} />
                  </LineChart>
                </div>
                <div className="col-2">Rata-rata Penjualan Perbulan</div>
              </div>
            </div>
            {/* chart pendapatan */}
            <div className="row justify-content-between">
              <div className="col-5 box-chart-pendapatan">
                <div className="row justify-content-between mt-4 mb-4">
                  <div className="col-6">Tren Pendapatan</div>
                  <div className="col-6">
                    {' '}
                    <select class="form-select form-select-sm" aria-label="form-select-sm example">
                      <option selected>Open this select menu</option>
                      <option value="">One</option>
                      <option value="">Two</option>
                      <option value="">Three</option>
                    </select>
                  </div>
                  <div className="mt-4 chart_pendapat">
                    <AreaChart width={400} height={250} data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis axisLine={false} dataKey="name" tickLine={false} minTickGap="5" />
                      <YAxis axisLine={false} tickLine={false} />
                      <CartesianGrid vertical={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                  </div>
                </div>
              </div>
              {/* chart pembatalan */}
              <div className="col-5 box-chart-pembatalan">
                <div className="row justify-content-between mt-4 mb-4">
                  <div className="col-6">Tren Pembatalan</div>
                  <div className="col-6">
                    {' '}
                    <select class="form-select form-select-sm" aria-label="form-select-sm example">
                      <option selected>Open this select menu</option>
                      <option value="">One</option>
                      <option value="">Two</option>
                      <option value="">Three</option>
                    </select>
                  </div>
                </div>
                <div className="chart_pembatalan">
                  <AreaChart width={440} height={250} data={data2} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis axisLine={false} dataKey="name" tickLine={false} minTickGap="5" />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  }
  if(localStorage.getItem('myTkn')){
    if(localStorage.getItem('myTkn') === tokenAdmin){
        return(
            <>{ringkasanStatistik()}</>
        )
    }else{
        return(
            <Navigate to='/' />
        )
    }
}else{
    if(localStorage.getItem('token') === tokenAdmin){
        return(
            <>{ringkasanStatistik()}</>
        )
    }else if(!localStorage.getItem('token')){
        return(
            <Navigate to='/loginadmin' />
        )
    }
  }
};

export default RingkasanStatistik;
