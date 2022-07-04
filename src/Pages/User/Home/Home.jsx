import React from 'react';
import './Home.css';
import bca from './../../../Assets/Bca.svg';
import mandiri from './../../../Assets/Mandiri.svg';
import permata from './../../../Assets/Permata.svg';
import ovo from './../../../Assets/Ovo.svg';
import gopay from './../../../Assets/Gopay.svg';
import shoope from './../../../Assets/Shoope.svg';

const Home = () => {
  return (
    <div>
      <div id="container-home">
        <div>jumbotron</div>
        <div>jumbotron unggah resep </div>
        <div>Kategori</div>
        <div>Lihat Semua</div>
        <hr />
        <div>Kejar Diskon Hari Ini</div>
        <div>Lihat Semua</div>
        <hr />
        <img src="" alt="" />
        <img src="" alt="" />
        <hr />
        <div>Popular Product</div>
        <div>Lihat Semua</div>
        <hr />
        <div>Jaminan Untuk Anda</div>
        <div className="d-flex">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div id="container-jumbotron-payment">
        <div>
          <div>Metode Pembayaran</div>
          <div className="d-flex justify-content-center">
            <img src={bca} alt="" className="me-4" />
            <img src={mandiri} alt="" className="me-4" />
            <img src={permata} alt="" className="me-4" />
            <img src={ovo} alt="" className="me-4" />
            <img src={gopay} alt="" className="me-4" />
            <img src={shoope} alt="" className="col-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
