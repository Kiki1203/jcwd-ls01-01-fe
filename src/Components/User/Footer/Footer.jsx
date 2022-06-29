import React from 'react';
import './Footer.css';
import bca from './../../../Assets/Bca.svg';
import mandiri from './../../../Assets/Mandiri.svg';
import permata from './../../../Assets/Permata.svg';
import ovo from './../../../Assets/Ovo.svg';
import gopay from './../../../Assets/Gopay.svg';
import shoope from './../../../Assets/Shoope.svg';
import logo from './../../../Assets/logo.svg';
import fb from './../../../Assets/fb.svg';
import ig from './../../../Assets/ig.svg';
import twitter from './../../../Assets/twitter.svg';
import wa from './../../../Assets/Whatsapp.svg';
import email from './../../../Assets/email.svg';
import call from './../../../Assets/call.svg';

const Footer = () => {
  return (
    <div className="Footer d-lg-block d-md-block d-none">
      <div className="container-fluid a">
        <div className="metode">Metode Pembayaran</div>
        <div className="row justify-content-center">
          <img src={bca} alt="" className="col-1 bca" />
          <img src={mandiri} alt="" className="col-1 mandiri" />
          <img src={permata} alt="" className="col-1 permata" />
          <img src={ovo} alt="" className=" col-1 ovo" />
          <img src={gopay} alt="" className="col-1 gopay" />
          <img src={shoope} alt="" className="col-1 shoope" />
        </div>
      </div>
      <div className="container-fluid b">
        <div className="row justify-content-center mt-5 ">
          <div className="col-4">
            <div className="mb-3">
              <a className="navbar-brand fbrand" href="/">
                <img src={logo} alt="" />
                Apotakecare
              </a>
            </div>
            <div className="row mb-2">
              <div className="col-2">
                <img src={wa} alt="" />
              </div>
              <div className="col-10">
                <div className="kontakHF">Chat Whatsapp</div>
                <div className="kontakCF">+62-0123-4567</div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2">
                <img src={email} alt="" />
              </div>
              <div className="col-10">
                <div className="kontakHF">Email</div>
                <div className="kontakCF">contact@apotakecare.com</div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <img src={call} alt="" />
              </div>
              <div className="col-10">
                <div className="kontakHF">Call Center</div>
                <div className="kontakCF">+62-0123-4567</div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="mb-4 listF">Tentang Kami</div>
            <div className="mb-4 listF">FAQ</div>
            <div className="mb-4 listF">Kebijakan Privasi</div>
            <div className="mb-4 listF">Syarat & Ketentuan</div>
            <div className="mb-4 listF">Karir</div>
          </div>
          <div className="col-2">
            <div className="mb-4 listF">Blog</div>
            <div className="mb-4 listF">Cara Belanja</div>
            <div className="mb-4 listF">Promo</div>
            <div className="mb-4 listF">Diagnosis</div>
          </div>
          <div className="col-2">
            <div className="ikutiF mb-4">Ikuti Kami</div>
            <div className="row mb-3">
              <div className="col-2">
                <img src={fb} alt="" />{' '}
              </div>
              <div className="col-10 sosialF">Facebook</div>
            </div>
            <div className="row mb-3">
              <div className="col-2">
                <img src={twitter} alt="" />{' '}
              </div>
              <div className="col-10 sosialF">Twitter</div>
            </div>
            <div className="row mb-3">
              <div className="col-2">
                <img src={ig} alt="" />{' '}
              </div>
              <div className="col-10 sosialF">Instagram</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center c">
          <div className="col-12 design">Design by @Purwadhika</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
