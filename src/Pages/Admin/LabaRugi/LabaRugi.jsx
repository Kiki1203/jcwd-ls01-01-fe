import React from 'react';
import './LabaRugi.css';
import SidebarAdmin from '../../../Components/Admin/SidebarAdmin/SidebarAdmin.jsx';

const LabaRugi = () => {
  return (
    <div>
      <SidebarAdmin />
      <div className="container-fluid-laba">
        <div className="mkm">Laporan Laba & Rugi</div>
        <div className="spa mb-5">Update terakhir: 20 Januari 2022, 14.30 WIB</div>
        <div className="row justify-content-start mb-4">
          <div className="col-3">
            <div>Periode</div>
            <select class="form-select form-select-sm" aria-label="form-select-sm example">
              <option selected>Open this select menu</option>
              <option value="">One</option>
              <option value="">Two</option>
              <option value="">Three</option>
            </select>
          </div>
          <div className="col-3">
            <div>Bulan</div>
            <select class="form-select form-select-sm" aria-label="form-select-sm example">
              <option selected>Open this select menu</option>
              <option value="">One</option>
              <option value="">Two</option>
              <option value="">Three</option>
            </select>
          </div>
          <div className="col-3">
            <div>Tahun</div>
            <select class="form-select form-select-sm" aria-label="form-select-sm example">
              <option selected>Open this select menu</option>
              <option value="">One</option>
              <option value="">Two</option>
              <option value="">Three</option>
            </select>
          </div>
        </div>
        <div className="box-statistik">
          <div className="box-table-laba">
            <div className="text-center mkm mb-2">Laporan Laba & Rugi</div>
            <div className="text-center spa mb-5">Periode Bulan Januari Tahun 2022 Terbit: Minggu 13 Februari, 2022 pukul 18.14 (GMT +07.00)</div>
            <div className="row mb-4">
              <div className="col-6 text-start">Penjualan</div>
              <div className="col-6 text-end">dalam rupiah </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">1.Penjualan Barang</div>
              <div className="col-6 text-end">0</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">2.Total Service</div>
              <div className="col-6 text-end">0</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">3.Total Embalanse</div>
              <div className="col-6 text-end">0</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">4.Ongkos Kirim</div>
              <div className="col-6 text-end">0</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">5.Diskon Penjualan</div>
              <div className="col-6 text-end">0</div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">6.Retur Penjualan</div>
              <div className="col-6 text-end">0</div>
            </div>
            <hr />
            <div className="row mb-2">
              <div className="col-6 text-start">Penjualan Bersih</div>
              <div className="col-6 text-end">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabaRugi;
