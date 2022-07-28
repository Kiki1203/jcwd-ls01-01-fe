import React, { useEffect, useState } from 'react';
import './RingkasanStatistik.css';
import API_URL from '../../../Helpers/API_URL.js';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';
import axios from 'axios';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

const RingkasanStatistik = () => {
  const [pesananBaru, setPesananBaru] = useState([]);
  const [diProses, setDiproses] = useState([]);
  const [sedangKirim, setSedangKirim] = useState([]);
  const [selesai, setSelesai] = useState([]);
  const [dibatalkan, setDibatalkan] = useState([]);
  const [Rata_penjualan, setRata_penjualan] = useState([]);
  const [Pjan, setPjan] = useState([]);
  const [Pfeb, setPfeb] = useState([]);
  const [Pmar, setPmar] = useState([]);
  const [Papr, setPapr] = useState([]);
  const [Pmei, setPmei] = useState([]);
  const [Pjun, setPjun] = useState([]);
  const [Pjul, setPjul] = useState([]);
  const [Pags, setPags] = useState([]);
  const [Psep, setPsep] = useState([]);
  const [Pokb, setPokb] = useState([]);
  const [Pnov, setPnov] = useState([]);
  const [Pdes, setPdes] = useState([]);
  const [Pjan1, setPjan1] = useState([]);
  const [Pfeb1, setPfeb1] = useState([]);
  const [Pmar1, setPmar1] = useState([]);
  const [Papr1, setPapr1] = useState([]);
  const [Pmei1, setPmei1] = useState([]);
  const [Pjun1, setPjun1] = useState([]);
  const [Pjul1, setPjul1] = useState([]);
  const [Pags1, setPags1] = useState([]);
  const [Psep1, setPsep1] = useState([]);
  const [Pokb1, setPokb1] = useState([]);
  const [Pnov1, setPnov1] = useState([]);
  const [Pdes1, setPdes1] = useState([]);
  const [Pjan2, setPjan2] = useState([]);
  const [Pfeb2, setPfeb2] = useState([]);
  const [Pmar2, setPmar2] = useState([]);
  const [Papr2, setPapr2] = useState([]);
  const [Pmei2, setPmei2] = useState([]);
  const [Pjun2, setPjun2] = useState([]);
  const [Pjul2, setPjul2] = useState([]);
  const [Pags2, setPags2] = useState([]);
  const [Psep2, setPsep2] = useState([]);
  const [Pokb2, setPokb2] = useState([]);
  const [Pnov2, setPnov2] = useState([]);
  const [Pdes2, setPdes2] = useState([]);

  var time = new Date().getTime(); // get your number
  var date = new Date(time); // create Date object

  const fectDataHead = async () => {
    const response = await axios.get(`${API_URL}/admin/statistik`).catch((err) => console.log(err));
    if (response) {
      let data = response.data;
      setPesananBaru(data.PesananBaru[0].TotalPesananBaru);
      setDiproses(data.Diproses[0].Diproses);
      setSedangKirim(data.Dikirim[0].Dikirim);
      setSelesai(data.Selesai[0].Selesai);
      setDibatalkan(data.Dibatalkan[0].Dibatalkan);
      setRata_penjualan(data.Rata_penjualan[0].Rata_penjualan);
    }
  };

  useEffect(() => {
    getTahunPenadapatan();
    getTahunPenadapatan();
    getPembatalan();
    fectDataHead();
  }, []);
  // data transaksi setiap bulan
  const getTahun = (e) => {
    console.log(e);

    axios
      .get(`${API_URL}/admin/transaksibulanan`, {
        headers: {
          tahun: e,
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
        setPjan(data.jan[0].total_transaksi);
        setPfeb(data.feb[0].total_transaksi);
        setPmar(data.mar[0].total_transaksi);
        setPapr(data.apr[0].total_transaksi);
        setPmei(data.mei[0].total_transaksi);
        setPjun(data.jun[0].total_transaksi);
        setPjul(data.jul[0].total_transaksi);
        setPags(data.ags[0].total_transaksi);
        setPsep(data.spt[0].total_transaksi);
        setPokb(data.okt[0].total_transaksi);
        setPnov(data.nov[0].total_transaksi);
        setPdes(data.des[0].total_transaksi);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataPenjualan = [
    {
      name: 'Jan',
      Total_taransaksi: Pjan,
    },
    {
      name: 'Feb',
      Total_taransaksi: Pfeb,
    },
    {
      name: 'Mar',
      Total_taransaksi: Pmar,
    },
    {
      name: 'Apr',
      Total_taransaksi: Papr,
    },
    {
      name: 'May',
      Total_taransaksi: Pmei,
    },
    {
      name: 'Jun',
      Total_taransaksi: Pjun,
    },
    {
      name: 'Jul',
      Total_taransaksi: Pjul,
    },
    {
      name: 'Ags',
      Total_taransaksi: Pags,
    },
    {
      name: 'Sep',
      Total_taransaksi: Psep,
    },
    {
      name: 'Okt',
      Total_taransaksi: Pokb,
    },
    {
      name: 'Nov',
      Total_taransaksi: Pnov,
    },
    {
      name: 'Des',
      Total_taransaksi: Pdes,
    },
  ];
  // data total penjualan setiap bulan
  const getTahunPenadapatan = (e) => {
    console.log(e);

    axios
      .get(`${API_URL}/admin/totalpendapatan`, {
        headers: {
          tahun: e,
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
        setPjan1(data.jan[0].total_pendapatan);
        setPfeb1(data.feb[0].total_pendapatan);
        setPmar1(data.mar[0].total_pendapatan);
        setPapr1(data.apr[0].total_pendapatan);
        setPmei1(data.mei[0].total_pendapatan);
        setPjun1(data.jun[0].total_pendapatan);
        setPjul1(data.jul[0].total_pendapatan);
        setPags1(data.ags[0].total_pendapatan);
        setPsep1(data.spt[0].total_pendapatan);
        setPokb1(data.okt[0].total_pendapatan);
        setPnov1(data.nov[0].total_pendapatan);
        setPdes1(data.des[0].total_pendapatan);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataPendapatan = [
    {
      name: 'Jan',
      Total_pendapatan: Number(Pjan1),
    },
    {
      name: 'Feb',
      Total_pendapatan: Number(Pfeb1),
    },
    {
      name: 'Mar',
      Total_pendapatan: Number(Pmar1),
    },
    {
      name: 'Apr',
      Total_pendapatan: Number(Papr1),
    },
    {
      name: 'May',
      Total_pendapatan: Number(Pmei1),
    },
    {
      name: 'Jun',
      Total_pendapatan: Number(Pjun1),
    },
    {
      name: 'Jul',
      Total_pendapatan: Number(Pjul1),
    },
    {
      name: 'Ags',
      Total_pendapatan: Number(Pags1),
    },
    {
      name: 'Sep',
      Total_pendapatan: Number(Psep1),
    },
    {
      name: 'Okt',
      Total_pendapatan: Number(Pokb1),
    },
    {
      name: 'Nov',
      Total_pendapatan: Number(Pnov1),
    },
    {
      name: 'Des',
      Total_pendapatan: Number(Pdes1),
    },
  ];
  // data pembatalan
  const getPembatalan = (e) => {
    console.log(e);

    axios
      .get(`${API_URL}/admin/pembatalan`, {
        headers: {
          tahun: e,
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
        setPjan2(data.jan[0].total_batal);
        setPfeb2(data.feb[0].total_batal);
        setPmar2(data.mar[0].total_batal);
        setPapr2(data.apr[0].total_batal);
        setPmei2(data.mei[0].total_batal);
        setPjun2(data.jun[0].total_batal);
        setPjul2(data.jul[0].total_batal);
        setPags2(data.ags[0].total_batal);
        setPsep2(data.spt[0].total_batal);
        setPokb2(data.okt[0].total_batal);
        setPnov2(data.nov[0].total_batal);
        setPdes2(data.des[0].total_batal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataPembatalan = [
    {
      name: 'Jan',
      Total_pembatalan: Pjan2,
    },
    {
      name: 'Feb',
      Total_pembatalan: Pfeb2,
    },
    {
      name: 'Mar',
      Total_pembatalan: Pmar2,
    },
    {
      name: 'Apr',
      Total_pembatalan: Papr2,
    },
    {
      name: 'May',
      Total_pembatalan: Pmei2,
    },
    {
      name: 'Jun',
      Total_pembatalan: Pjun2,
    },
    {
      name: 'Jul',
      Total_pembatalan: Pjul2,
    },
    {
      name: 'Ags',
      Total_pembatalan: Pags2,
    },
    {
      name: 'Sep',
      Total_pembatalan: Psep2,
    },
    {
      name: 'Okt',
      Total_pembatalan: Pokb2,
    },
    {
      name: 'Nov',
      Total_pembatalan: Pnov2,
    },
    {
      name: 'Des',
      Total_pembatalan: Pdes2,
    },
  ];

  return (
    <div>
      <SidebarAdmin />
      <div className="container-fluid-statistik">
        <div className="box-statistik">
          {/* header */}
          <div className="mb-5">
            <h5 className="mt-3 title ">Ringkasan Statistik</h5>
            <div className="spa">Update terakhir: {date.toString()}</div>
          </div>
          {/* box 6 */}
          <div className="row justify-content-between mb-5">
            <div className="col-1 px-3 py-3 box-kecil">
              <div className="titlehead">Pesanan Baru</div>
              <div className="isihead">{pesananBaru}</div>
            </div>
            <div className="col-1 px-3 py-3 box-kecil">
              <div className="titlehead">Di Proses</div>
              <div className="isihead">{diProses}</div>
            </div>
            <div className="col-1 col-1 px-3 py-3 box-kecil">
              <div className="titlehead">Sedang Dikirim</div>
              <div className="isihead">{sedangKirim}</div>
            </div>
            <div className="col-1 col-1 px-3 py-3 box-kecil">
              <div className="titlehead">Selesai</div>
              <div className="isihead">{selesai}</div>
            </div>
            <div className="col-1 col-1 px-3 py-3 box-kecil">
              <div className="titlehead">Dibatalkan</div>
              <div className="isihead">{dibatalkan}</div>
            </div>
            <div className="col-1 col-1 px-3 py-3 box-kecil">
              <div className="titlehead">Chat Baru</div>
              <div className="isihead">0</div>
            </div>
          </div>

          {/* chart penjualan */}
          <div className="box-chart-penjualan row px-3 py-3 mb-4">
            <div className="row justify-content-between mb-4">
              <div className="col-4">
                {' '}
                <div className="title ">Transaksi Penjualan Obat </div>
              </div>
              <div className="col-4">
                <select
                  class="form-select form-select-sm"
                  aria-label="form-select-sm example"
                  onChange={(e) => {
                    getTahun(e.target.value);
                  }}
                >
                  <option selected>Tahun</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-10 chart_penjualan">
                <AreaChart width={700} height={300} data={dataPenjualan} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="red" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Legend align="right" />
                  <XAxis axisLine={false} dataKey="name" tickLine={false} minTickGap="5" />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid vertical={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="Total_taransaksi" stroke="red" fillOpacity={1} fill="url(#colorUp)" />
                </AreaChart>
              </div>
              <div className="col-1 box-kecil-chart py-3 px-3 ">
                <div className="titlehead">Rata-rata Penjualan</div>
                <div className="isihead">{Rata_penjualan}</div>
              </div>
            </div>
          </div>
          {/* chart pendapatan */}
          <div className="row justify-content-between">
            <div className="col-5 box-chart-pendapatan">
              <div className="row justify-content-between mt-4 mb-4">
                <div className="col-6 title ">Tren Pendapatan</div>
                <div className="col-6">
                  {' '}
                  <select
                    class="form-select form-select-sm"
                    aria-label="form-select-sm example "
                    onChange={(e) => {
                      getTahunPenadapatan(e.target.value);
                    }}
                  >
                    <option selected>Tahun</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div className="mt-4 chart_pendapat">
                  <AreaChart width={400} height={250} data={dataPendapatan} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
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
                    <Area type="monotone" dataKey="Total_pendapatan" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </div>
              </div>
            </div>
            {/* chart pembatalan */}
            <div className="col-5 box-chart-pembatalan">
              <div className="row justify-content-between mt-4 mb-4">
                <div className="col-6 title ">Tren Pembatalan</div>
                <div className="col-6">
                  {' '}
                  <select
                    class="form-select form-select-sm"
                    aria-label="form-select-sm example"
                    onChange={(e) => {
                      getPembatalan(e.target.value);
                    }}
                  >
                    <option selected>Tahun</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>
              <div className="chart_pembatalan">
                <AreaChart width={440} height={250} data={dataPembatalan} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis axisLine={false} dataKey="name" tickLine={false} minTickGap="5" />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="Total_pembatalan" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPP)" />
                </AreaChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingkasanStatistik;
