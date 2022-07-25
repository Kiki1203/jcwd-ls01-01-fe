import React from 'react';
import './Footer.css';
import logo from './../../../Assets/logo.svg';
import fb from './../../../Assets/fb.svg';
import ig from './../../../Assets/ig.svg';
import twitter from './../../../Assets/twitter.svg';
import wa from './../../../Assets/Whatsapp.png';
import email from './../../../Assets/email.svg';
import call from './../../../Assets/call.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate  } from 'react-router-dom';
import { faUser, faHome, faPills, faReceipt, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navigate = useNavigate()

  return (
   <>
    <div className="Footer d-lg-flex d-md-flex d-none">
      <div className='box-footer-user'>
        <div className='box-1-inside-footer-user'>
          <div>
            <a className="footer-logo" href="/" style={{textDecoration: "none"}}>
                <img src={logo} alt="" />
                Apotakecare
              </a>
          </div>
          <div className="d-flex mt-4">
            <img src={wa} alt="" />
            <div className='mx-3'>
              <div className="judul-kontak">Chat Whatsapp</div>
              <div className="edit-kontak">+62-0123-4567</div>
            </div>
          </div>
           <div className="d-flex mt-3">
            <img src={email} alt="" />
            <div className='mx-4'>
                <div className="judul-kontak">Email</div>
                <div className="edit-kontak">contact@apotakecare.com</div>
            </div>
          </div>
          <div className="d-flex mt-3">
            <img src={call} alt="" />
            <div className='mx-4'>
                <div className="judul-kontak">Call Center</div>
                <div className="edit-kontak">+62-0123-4567</div>
            </div>
          </div>
        </div>
        <div className='box-2-inside-footer-user'>
            <div className="mb-4 listF">Tentang Kami</div>
            <div className="mb-4 listF">FAQ</div>
            <div className="mb-4 listF">Kebijakan Privasi</div>
            <div className="mb-4 listF">Syarat & Ketentuan</div>
            <div className="mb-4 listF">Karir</div>

        </div>
        <div className='box-3-inside-footer-user'>
            <div className="mb-0 listF">Blog</div>
            <div className="mb-0 listF">Cara Belanja</div>
            <div className="mb-0 listF">Promo</div>
            <div className="mb-0 listF">Diagnosis</div>
        </div>
        <div className='box-4-inside-footer-user'>
          <div className="ikuti-kami">Ikuti kami</div>
          <div className="d-flex mt-3">
            <img src={fb} alt="" />
            <div className='mx-3'>
                <div className="judul-medsos">Facebook</div>
            </div>
          </div>
          <div className="d-flex mt-3">
            <img src={twitter} alt="" />
            <div className='mx-3'>
                <div className="judul-medsos">Twitter</div>
            </div>
          </div>
          <div className="d-flex mt-3">
            <img src={ig} alt="" />
            <div className='mx-3'>
                <div className="judul-medsos">Instagram</div>
            </div>
          </div>
        </div>
      </div>
      <div className='box-5-inside-footer-user'>
        <div className="design-footer">Powered by @Apotakecare</div>
      </div>   
    </div>
   </>
  );
};

export default Footer;
